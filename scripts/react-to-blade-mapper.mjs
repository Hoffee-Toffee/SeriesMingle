import fs from 'node:fs';
import path from 'node:path';
import sass from 'sass';
import ts from 'typescript';

const voidElements = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

const styleUtilityPrefixes = {
  backgroundColor: 'bg',
  borderColor: 'border',
  color: 'text',
  fill: 'fill',
  outlineColor: 'outline',
  stroke: 'stroke',
};

function readArguments(args) {
  const values = {};

  for (let index = 0; index < args.length; index += 1) {
    const [key, inlineValue] = args[index].split('=', 2);

    if (!key.startsWith('--')) {
      throw new Error(`Unexpected argument: ${args[index]}`);
    }

    const name = key.slice(2);

    if (name === 'apply') {
      if (inlineValue !== undefined) {
        throw new Error('--apply does not accept a value.');
      }

      values[name] = true;
      continue;
    }

    const value = inlineValue ?? args[index + 1];

    if (!value || value.startsWith('--')) {
      throw new Error(`Missing value for ${key}.`);
    }

    values[name] = value;

    if (inlineValue === undefined) {
      index += 1;
    }
  }

  return values;
}

function kebabCase(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .toLowerCase();
}

function portablePath(value) {
  return value.split(path.sep).join('/');
}

function escapeHtmlAttribute(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replace(/@endverbatim/gi, '&#64;endverbatim');
}

function escapeBladeSyntax(value) {
  return value
    .replaceAll('@', '&#64;')
    .replaceAll('{', '&#123;')
    .replaceAll('}', '&#125;');
}

function jsxText(value, bladeOutput = false) {
  const lines = value.split(/\r?\n/).map((line, index, allLines) => {
    let normalized = line.replace(/\t/g, ' ');

    if (index > 0) {
      normalized = normalized.replace(/^\s+/, '');
    }

    if (index < allLines.length - 1) {
      normalized = normalized.replace(/\s+$/, '');
    }

    return normalized;
  });

  const text = lines
    .filter((line) => line !== '')
    .join(' ');

  return bladeOutput ? escapeBladeSyntax(text) : text.replace(/@endverbatim/gi, '&#64;endverbatim');
}

const authUser = Symbol('auth-user');

function knownExpressionValue(expression, props) {
  if (!expression) {
    return { supported: false };
  }

  const value = unwrapExpression(expression);
  const staticValue = staticExpressionValue(value);

  if (staticValue.supported) {
    return staticValue;
  }

  if (ts.isIdentifier(value)) {
    if (props.has(value.text)) {
      return { supported: true, value: props.get(value.text) };
    }

    if (value.text === 'user') {
      return { supported: true, value: authUser };
    }
  }

  if (
    ts.isBinaryExpression(value)
    && [
      ts.SyntaxKind.EqualsEqualsEqualsToken,
      ts.SyntaxKind.EqualsEqualsToken,
      ts.SyntaxKind.ExclamationEqualsEqualsToken,
      ts.SyntaxKind.ExclamationEqualsToken,
    ].includes(value.operatorToken.kind)
  ) {
    const left = knownExpressionValue(value.left, props);
    const right = knownExpressionValue(value.right, props);

    if (left.supported && right.supported && left.value !== authUser && right.value !== authUser) {
      const equal = String(left.value) === String(right.value);
      const negated = [
        ts.SyntaxKind.ExclamationEqualsEqualsToken,
        ts.SyntaxKind.ExclamationEqualsToken,
      ].includes(value.operatorToken.kind);

      return { supported: true, value: negated ? !equal : equal };
    }
  }

  return { supported: false };
}

function unwrapExpression(node) {
  let current = node;

  while (ts.isParenthesizedExpression(current) || ts.isAsExpression(current)) {
    current = current.expression;
  }

  return current;
}

function findComponentNode(sourceFile, componentName) {
  for (const statement of sourceFile.statements) {
    if (
      ts.isExportAssignment(statement)
      && !statement.isExportEquals
      && (ts.isArrowFunction(statement.expression) || ts.isFunctionExpression(statement.expression))
    ) {
      return statement.expression;
    }

    if (ts.isFunctionDeclaration(statement) && statement.name?.text === componentName) {
      return statement;
    }

    if (!ts.isVariableStatement(statement)) {
      continue;
    }

    for (const declaration of statement.declarationList.declarations) {
      if (
        ts.isIdentifier(declaration.name)
        && declaration.name.text === componentName
        && declaration.initializer
        && (ts.isArrowFunction(declaration.initializer) || ts.isFunctionExpression(declaration.initializer))
      ) {
        return declaration.initializer;
      }
    }
  }

  return null;
}

function findJsxReturns(componentNode) {
  const returns = [];

  function visit(node, root = false) {
    if (!root && (ts.isFunctionLike(node) || ts.isClassLike(node))) {
      return;
    }

    if (ts.isReturnStatement(node) && node.expression) {
      const expression = unwrapExpression(node.expression);

      if (
        ts.isJsxElement(expression)
        || ts.isJsxSelfClosingElement(expression)
        || ts.isJsxFragment(expression)
      ) {
        returns.push(expression);
      }

      return;
    }

    ts.forEachChild(node, (child) => visit(child));
  }

  if (componentNode.body && !ts.isBlock(componentNode.body)) {
    const expression = unwrapExpression(componentNode.body);

    if (
      ts.isJsxElement(expression)
      || ts.isJsxSelfClosingElement(expression)
      || ts.isJsxFragment(expression)
    ) {
      returns.push(expression);
    }
  } else if (componentNode.body) {
    visit(componentNode.body, true);
  }

  return returns;
}

function findJsxElement(componentNode, tagName) {
  for (const root of findJsxReturns(componentNode)) {
    let match = null;

    function visit(node) {
      if (match) {
        return;
      }

      if (
        (ts.isJsxElement(node) && node.openingElement.tagName.getText() === tagName)
        || (ts.isJsxSelfClosingElement(node) && node.tagName.getText() === tagName)
      ) {
        match = node;
        return;
      }

      ts.forEachChild(node, visit);
    }

    visit(root);

    if (match) {
      return match;
    }
  }

  let match = null;

  function visitComponent(node) {
    if (match) {
      return;
    }

    if (
      (ts.isJsxElement(node) && node.openingElement.tagName.getText() === tagName)
      || (ts.isJsxSelfClosingElement(node) && node.tagName.getText() === tagName)
    ) {
      match = node;
      return;
    }

    ts.forEachChild(node, visitComponent);
  }

  visitComponent(componentNode);

  if (match) {
    return match;
  }

  return null;
}

function routerLinkAliasesFor(sourceFile) {
  const aliases = new Set();

  for (const statement of sourceFile.statements) {
    if (!ts.isImportDeclaration(statement) || statement.moduleSpecifier.text !== 'react-router-dom') {
      continue;
    }

    if (!statement.importClause?.namedBindings || !ts.isNamedImports(statement.importClause.namedBindings)) {
      continue;
    }

    for (const element of statement.importClause.namedBindings.elements) {
      if (['Link', 'NavLink'].includes(element.name.text) || ['Link', 'NavLink'].includes(element.propertyName?.text)) {
        aliases.add(element.name.text);
      }
    }
  }

  return aliases;
}

function sourceLine(sourceFile, node) {
  return sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1;
}

function escapedExpression(sourceFile, node) {
  return node.getText(sourceFile).replace(/\s+/g, ' ').slice(0, 180);
}

function staticExpressionValue(expression) {
  const value = unwrapExpression(expression);

  if (ts.isStringLiteralLike(value)) {
    return { supported: true, value: value.text };
  }

  if (ts.isNumericLiteral(value)) {
    return { supported: true, value: value.text };
  }

  if (value.kind === ts.SyntaxKind.TrueKeyword) {
    return { supported: true, value: true };
  }

  if (value.kind === ts.SyntaxKind.FalseKeyword || value.kind === ts.SyntaxKind.NullKeyword) {
    return { supported: true, value: false };
  }

  return { supported: false };
}

function sourceValue(expression, props) {
  const value = unwrapExpression(expression);

  if (ts.isIdentifier(value) && props.has(value.text)) {
    return props.get(value.text);
  }

  if (
    ts.isPropertyAccessExpression(value)
    && ts.isIdentifier(value.expression)
    && ['ownedProjects', 'joinedProjects'].includes(value.expression.text)
    && value.name.text === 'length'
  ) {
    return { bladeCollection: `$${value.expression.text}` };
  }

  return null;
}

function collectStyleTokens(styleFiles, sourceRoot) {
  const tokens = {};
  const conflicts = new Set();
  const sources = {};

  for (const filePath of styleFiles) {
    const content = fs.readFileSync(filePath, 'utf8');
    const rootBlocks = content.matchAll(/:root\s*\{([^}]*)\}/g);

    for (const rootBlock of rootBlocks) {
      const [, declarations] = rootBlock;

      for (const declaration of declarations.matchAll(/^\s*--([\w-]+)\s*:\s*([^;]+);/gm)) {
        const [, rawName, rawValue] = declaration;
        const name = rawName.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        const value = rawValue.replace(/\/\/.*$/, '').trim();
        const declarationOffset = rootBlock.index
          + rootBlock[0].indexOf('{')
          + 1
          + declaration.index
          + declaration[0].indexOf('--');
        const line = content.slice(0, declarationOffset).split(/\r?\n/).length;

        if (!/^(?:#[\da-f]{3,8}|(?:rgb|hsl|hwb|lab|lch|color)\(.+\)|transparent|currentColor|black|white)$/i.test(value)) {
          continue;
        }

        sources[name] ??= [];
        sources[name].push({
          source: portablePath(path.relative(sourceRoot, filePath)),
          line,
          value,
        });

        if (tokens[name] !== undefined && tokens[name] !== value) {
          conflicts.add(name);
          delete tokens[name];
          continue;
        }

        if (!conflicts.has(name)) {
          tokens[name] = value;
        }
      }
    }
  }

  return {
    tokens: Object.fromEntries(Object.entries(tokens).sort(([left], [right]) => left.localeCompare(right))),
    conflicts: [...conflicts].sort(),
    sources: Object.fromEntries(Object.entries(sources).sort(([left], [right]) => left.localeCompare(right))),
  };
}

function mapperFor(sourceFile, componentName, routerLinkAliases, colorTokens, options = {}) {
  const issues = [];
  const props = options.props ?? new Map();
  const componentStack = options.componentStack ?? [sourceFile.fileName];
  const bladeOutput = options.bladeOutput ?? false;
  const assetImports = new Map();

  for (const statement of sourceFile.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) {
      continue;
    }

    const importClause = statement.importClause;
    const modulePath = statement.moduleSpecifier.text;

    if (!importClause || !modulePath.startsWith('.')) {
      continue;
    }

    const resolvedPath = path.resolve(path.dirname(sourceFile.fileName), modulePath);

    if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(resolvedPath) && importClause.name) {
      assetImports.set(importClause.name.text, resolvedPath);
    }
  }

  function importedComponentPath(name) {
    for (const statement of sourceFile.statements) {
      if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) {
        continue;
      }

      const importClause = statement.importClause;

      if (!importClause || !statement.moduleSpecifier.text.startsWith('.')) {
        continue;
      }

      const modulePath = path.resolve(path.dirname(sourceFile.fileName), statement.moduleSpecifier.text);
      const relativeModulePath = path.relative(options.projectRoot, modulePath);

      if (
        path.isAbsolute(relativeModulePath)
        || relativeModulePath === '..'
        || relativeModulePath.startsWith(`..${path.sep}`)
      ) {
        continue;
      }

      const defaultImportMatches = importClause.name?.text === name;
      const namedImportMatches = importClause.namedBindings
        && ts.isNamedImports(importClause.namedBindings)
        && importClause.namedBindings.elements.some((element) => element.name.text === name);

      if (!defaultImportMatches && !namedImportMatches) {
        continue;
      }

      const candidates = path.extname(modulePath)
        ? [modulePath]
        : ['.tsx', '.ts', '.jsx', '.js'].map((extension) => `${modulePath}${extension}`);

      return candidates.find((candidate) => fs.existsSync(candidate)) ?? null;
    }

    return null;
  }

  function importedRouterLinkAliases(importedSourceFile) {
    const aliases = new Set();

    for (const statement of importedSourceFile.statements) {
      if (!ts.isImportDeclaration(statement) || statement.moduleSpecifier.text !== 'react-router-dom') {
        continue;
      }

      if (!statement.importClause?.namedBindings || !ts.isNamedImports(statement.importClause.namedBindings)) {
        continue;
      }

      for (const element of statement.importClause.namedBindings.elements) {
        if (['Link', 'NavLink'].includes(element.name.text) || ['Link', 'NavLink'].includes(element.propertyName?.text)) {
          aliases.add(element.name.text);
        }
      }
    }

    return aliases;
  }

  function routeExpression(value) {
    const routes = {
      '/': 'home',
      '/dashboard': 'dashboard',
      '/login': 'login',
    };

    return options.bladeOutput && Object.hasOwn(routes, value)
      ? `{{ route('${routes[value]}') }}`
      : null;
  }

  function routeName(value) {
    return ({
      '/': 'home',
      '/dashboard': 'dashboard',
      '/login': 'login',
    })[value] ?? null;
  }

  function issue(node, type, message, snippet = '') {
    issues.push({
      type,
      line: sourceLine(sourceFile, node),
      message,
      ...(snippet ? { source: snippet } : {}),
    });
  }

  function renderBranch(node) {
    const value = unwrapExpression(node);

    if (
      ts.isJsxElement(value)
      || ts.isJsxSelfClosingElement(value)
      || ts.isJsxFragment(value)
    ) {
      return renderNode(value);
    }

    return renderExpression(value);
  }

  function bladeProperty(expression) {
    const value = unwrapExpression(expression);

    if (ts.isIdentifier(value)) {
      const prop = props.get(value.text);

      return prop?.bladeExpression ?? null;
    }

    if (ts.isPropertyAccessExpression(value)) {
      const object = bladeProperty(value.expression);

      return object ? `${object}->${value.name.text}` : null;
    }

    return null;
  }

  function mappedCollection(expression) {
    const call = unwrapExpression(expression);

    if (!ts.isCallExpression(call) || call.arguments.length !== 1) {
      return null;
    }

    const method = unwrapExpression(call.expression);

    if (
      !ts.isPropertyAccessExpression(method)
      || method.name.text !== 'map'
      || !ts.isIdentifier(method.expression)
      || !['ownedProjects', 'joinedProjects'].includes(method.expression.text)
    ) {
      return null;
    }

    const callback = call.arguments[0];

    if (
      !ts.isArrowFunction(callback)
      || callback.parameters.length !== 1
      || !ts.isIdentifier(callback.parameters[0].name)
    ) {
      return null;
    }

    const collection = `$${method.expression.text}`;
    const itemName = callback.parameters[0].name.text;
    const previousValue = props.get(itemName);
    const hadPreviousValue = props.has(itemName);
    props.set(itemName, { bladeExpression: '$project' });
    let item;

    try {
      item = renderBranch(callback.body);
    } finally {
      if (hadPreviousValue) {
        props.set(itemName, previousValue);
      } else {
        props.delete(itemName);
      }
    }

    options.mappings?.push({
      source: `${method.expression.text}.map`,
      target: `@forelse(${collection} as $project)`,
    });

    return `@forelse(${collection} as $project)${item}@empty<p>${method.expression.text === 'ownedProjects' ? 'No Projects' : 'No Shared Projects'}</p>@endforelse`;
  }

  function renderExpression(node, attributeName = null) {
    if (!node || node.kind === ts.SyntaxKind.JsxEmptyExpression) {
      return '';
    }

    const expression = unwrapExpression(node);

    if (ts.isConditionalExpression(expression)) {
      const condition = knownExpressionValue(expression.condition, props);
      const collection = sourceValue(expression.condition, props);

      if (condition.supported && condition.value === authUser && bladeOutput) {
        const whenTrue = knownExpressionValue(expression.whenTrue, props);
        const whenFalse = knownExpressionValue(expression.whenFalse, props);

        if (attributeName === 'href' && whenTrue.supported && whenFalse.supported) {
          const trueRoute = routeName(String(whenTrue.value));
          const falseRoute = routeName(String(whenFalse.value));

          if (trueRoute && falseRoute) {
            return `{{ auth()->check() ? route('${trueRoute}') : route('${falseRoute}') }}`;
          }
        }

        if (
          !attributeName
          && whenTrue.supported
          && whenFalse.supported
          && typeof whenTrue.value === 'string'
          && typeof whenFalse.value === 'string'
        ) {
          const quote = (value) => value.replaceAll('\\', '\\\\').replaceAll("'", "\\'");

          return `{{ auth()->check() ? '${quote(whenTrue.value)}' : '${quote(whenFalse.value)}' }}`;
        }

        return `@auth${renderBranch(expression.whenTrue)}@else${renderBranch(expression.whenFalse)}@endauth`;
      }

      if (condition.supported && condition.value !== authUser) {
        return renderBranch(condition.value ? expression.whenTrue : expression.whenFalse);
      }

      if (
        bladeOutput
        && collection?.bladeCollection
        && ts.isCallExpression(unwrapExpression(expression.whenTrue))
      ) {
        const mapped = mappedCollection(expression.whenTrue);

        if (mapped !== null) {
          return mapped.replace(
            /@forelse\(\$[^ ]+ as \$project\)/,
            `@forelse(${collection.bladeCollection} as $project)`,
          );
        }
      }
    }

    if (
      ts.isBinaryExpression(expression)
      && expression.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken
    ) {
      const condition = knownExpressionValue(expression.left, props);

      if (condition.supported && condition.value === authUser && bladeOutput) {
        return `@auth${renderBranch(expression.right)}@endauth`;
      }

      if (condition.supported) {
        return condition.value ? renderBranch(expression.right) : '';
      }
    }

    if (bladeOutput && ts.isCallExpression(expression)) {
      const mapped = mappedCollection(expression);

      if (mapped !== null) {
        return mapped;
      }
    }

    if (bladeOutput && ts.isPropertyAccessExpression(expression)) {
      const property = bladeProperty(expression);

      if (property) {
        return `{{ ${property} }}`;
      }
    }

    if (
      bladeOutput
      && ts.isBinaryExpression(expression)
      && expression.operatorToken.kind === ts.SyntaxKind.BarBarToken
    ) {
      const property = bladeProperty(expression.left);
      const fallback = staticExpressionValue(expression.right);

      if (property && fallback.supported && typeof fallback.value === 'string') {
        const fallbackText = fallback.value.replaceAll('\\', '\\\\').replaceAll("'", "\\'");

        return `{{ ${property} ?: '${fallbackText}' }}`;
      }
    }

    if (bladeOutput && ts.isTemplateExpression(expression) && attributeName === 'href') {
      const routeMatch = expression.head.text.match(/^\/(?:project|projects)\/$/);
      const projectId = expression.templateSpans.length === 1
        ? bladeProperty(expression.templateSpans[0].expression)
        : null;

      if (routeMatch && projectId) {
        return `{{ route('project.show', ${projectId}) }}`;
      }
    }

    if (attributeName && bladeOutput && ts.isIdentifier(expression) && assetImports.has(expression.text)) {
      const sourcePath = assetImports.get(expression.text);
      const relativeAssetPath = portablePath(path.relative(options.projectRoot, sourcePath));

      options.assets?.set(relativeAssetPath, sourcePath);

      return bladeOutput
        ? `{{ asset('react-mapped/assets/${relativeAssetPath}') }}`
        : '';
    }

    const value = knownExpressionValue(expression, props);

    if (value.supported) {
      if (value.value === authUser) {
        return '';
      }

      if (typeof value.value === 'boolean') {
        return '';
      }

      const renderedRoute = attributeName === 'href' ? routeExpression(String(value.value)) : null;

      if (renderedRoute !== null) {
        return renderedRoute;
      }

      const renderedValue = escapeHtmlAttribute(String(value.value));

      return bladeOutput ? escapeBladeSyntax(renderedValue) : renderedValue;
    }

    issue(
      expression,
      'dynamic_expression',
      'React expression was not evaluated or rewritten; migrate its behavior in Laravel.',
      escapedExpression(sourceFile, expression),
    );

    return '';
  }

  function renderStyle(attribute) {
    const initializer = attribute.initializer;

    if (!initializer || !ts.isJsxExpression(initializer) || !initializer.expression) {
      issue(attribute, 'unsupported_style', 'Non-object inline style could not be mapped.');

      return bladeOutput ? { classes: [], inline: null } : [];
    }

    const expression = unwrapExpression(initializer.expression);

    if (!ts.isObjectLiteralExpression(expression)) {
      issue(
        attribute,
        'unsupported_style',
        'Dynamic inline style was not translated into guessed Tailwind utilities.',
        escapedExpression(sourceFile, expression),
      );

      return bladeOutput ? { classes: [], inline: null } : [];
    }

    if (bladeOutput) {
      const declarations = [];

      for (const property of expression.properties) {
        if (!ts.isPropertyAssignment(property) || !property.initializer) {
          issue(property, 'unsupported_style', 'Spread or computed inline style needs manual mapping.');
          continue;
        }

        const name = ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)
          ? property.name.text
          : '';
        const value = staticExpressionValue(property.initializer);

        if (!/^[a-zA-Z][\w-]*$/.test(name) || !value.supported || !['string', 'number'].includes(typeof value.value)) {
          issue(
            property,
            'unsupported_style',
            'Only static inline CSS declarations are copied to the applied Blade view.',
            escapedExpression(sourceFile, property),
          );
          continue;
        }

        declarations.push(`${kebabCase(name)}: ${String(value.value)}`);
      }

      return {
        classes: [],
        inline: declarations.length > 0 ? declarations.join('; ') : null,
      };
    }

    const classes = [];

    for (const property of expression.properties) {
      if (!ts.isPropertyAssignment(property) || !property.initializer) {
        issue(property, 'unsupported_style', 'Spread or computed inline style needs manual migration.');
        continue;
      }

      const propertyName = ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)
        ? property.name.text
        : '';
      const utilityPrefix = styleUtilityPrefixes[propertyName];
      const staticValue = staticExpressionValue(property.initializer);
      const colorToken = typeof staticValue.value === 'string'
        ? staticValue.value.match(/^var\(--([\w-]+)\)$/)?.[1]
        : null;

      if (!utilityPrefix || !staticValue.supported || !colorToken) {
        issue(
          property,
          'unsupported_style',
          'Only static color custom properties with an unambiguous Tailwind token are mapped.',
          escapedExpression(sourceFile, property),
        );
        continue;
      }

      const normalizedToken = colorToken.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

      if (!Object.hasOwn(colorTokens, normalizedToken)) {
        issue(
          property,
          'unmapped_style_token',
          `SCSS color token "${colorToken}" was not found in the source styles.`,
          escapedExpression(sourceFile, property),
        );
        continue;
      }

      classes.push(`${utilityPrefix}-[${colorTokens[normalizedToken]}]`);
    }

    return classes;
  }

  function renderAttributeValue(value, name) {
    const renderedRoute = name === 'href' ? routeExpression(value) : null;

    if (renderedRoute !== null) {
      return renderedRoute;
    }

    const escapedValue = escapeHtmlAttribute(value);

    return bladeOutput ? escapeBladeSyntax(escapedValue) : escapedValue;
  }

  function renderAttributes(attributes, isRouterLink) {
    const rendered = [];
    const classes = [];
    let classPosition = null;

    for (const attribute of attributes.properties) {
      if (ts.isJsxSpreadAttribute(attribute)) {
        issue(attribute, 'spread_attribute', 'JSX spread attributes require manual prop mapping.');
        continue;
      }

      if (!ts.isJsxAttribute(attribute)) {
        continue;
      }

      const originalName = attribute.name.getText(sourceFile);

      if (originalName === 'key' || originalName === 'ref') {
        continue;
      }

      if (/^on[A-Z]/.test(originalName)) {
        if (
          bladeOutput
          && options.page === 'dashboard'
          && originalName === 'onClick'
          && attribute.initializer
          && ts.isJsxExpression(attribute.initializer)
          && attribute.initializer.expression
          && ts.isArrowFunction(attribute.initializer.expression)
          && ts.isCallExpression(unwrapExpression(attribute.initializer.expression.body))
          && unwrapExpression(attribute.initializer.expression.body).expression.getText(sourceFile) === 'createProjectAndOpen'
        ) {
          rendered.push('wire:click="createProject"');
          options.mappings?.push({
            source: 'createProjectAndOpen()',
            target: 'wire:click="createProject"',
          });
          continue;
        }

        issue(
          attribute,
          'event_handler',
          'React event handler was not converted to a Livewire or Alpine action.',
          `${originalName}=${attribute.initializer?.getText(sourceFile) ?? ''}`,
        );
        continue;
      }

      if (originalName === 'style') {
        if (classPosition === null) {
          classPosition = rendered.length;
        }
        const style = renderStyle(attribute);

        if (Array.isArray(style)) {
          classes.push(...style);
        } else if (style.inline !== null) {
          rendered.push(`style="${escapeHtmlAttribute(escapeBladeSyntax(style.inline))}"`);
        }
        continue;
      }

      let name = originalName === 'className' ? 'class' : originalName === 'htmlFor' ? 'for' : originalName;

      if (isRouterLink && originalName === 'to') {
        name = 'href';
      }

      if (originalName === 'to' && !isRouterLink) {
        issue(attribute, 'unsupported_attribute', 'The "to" attribute has no safe mapping for this element.');
        continue;
      }

      if (!attribute.initializer) {
        rendered.push(name);
        continue;
      }

      if (ts.isStringLiteral(attribute.initializer)) {
        const value = renderAttributeValue(attribute.initializer.text, name);

        if (name === 'class') {
          if (classPosition === null) {
            classPosition = rendered.length;
          }
          classes.push(value);
        } else {
          rendered.push(`${name}="${value}"`);
        }

        continue;
      }

      if (ts.isJsxExpression(attribute.initializer) && attribute.initializer.expression) {
        const value = knownExpressionValue(attribute.initializer.expression, props);

        if (value.supported) {
          if (value.value === authUser) {
            const renderedExpression = renderExpression(attribute.initializer.expression, name);

            if (renderedExpression !== '') {
              rendered.push(`${name}="${renderedExpression}"`);
            }

            continue;
          }

          if (typeof value.value === 'boolean') {
            if (name.startsWith('aria-') || name.startsWith('data-')) {
              rendered.push(`${name}="${value.value}"`);
            } else if (value.value) {
              rendered.push(name);
            }
          } else {
            const escapedValue = renderAttributeValue(String(value.value), name);

            if (name === 'class') {
              if (classPosition === null) {
                classPosition = rendered.length;
              }
              classes.push(escapedValue);
            } else {
              rendered.push(`${name}="${escapedValue}"`);
            }
          }

          continue;
        }

        const renderedExpression = renderExpression(attribute.initializer.expression, name);

        if (renderedExpression !== '') {
          rendered.push(`${name}="${renderedExpression}"`);
        } else if (!assetImports.has(unwrapExpression(attribute.initializer.expression).getText(sourceFile))) {
          issue(
            attribute,
            'dynamic_attribute',
            `Dynamic "${originalName}" attribute needs manual data or prop mapping.`,
            escapedExpression(sourceFile, attribute.initializer.expression),
          );
        }
        continue;
      }

      issue(attribute, 'unsupported_attribute', `Attribute "${originalName}" could not be mapped.`);
    }

    if (classes.length > 0) {
      rendered.splice(
        classPosition ?? rendered.length,
        0,
        `class="${escapeHtmlAttribute(classes.join(' '))}"`,
      );
    }

    return rendered.length > 0 ? ` ${rendered.join(' ')}` : '';
  }

  function renderElement(node) {
    if (ts.isJsxFragment(node)) {
      return node.children.map(renderNode).join('');
    }

    const opening = ts.isJsxElement(node) ? node.openingElement : node;
    const originalTagName = opening.tagName.getText(sourceFile);
    const isRouterLink = routerLinkAliases.has(originalTagName);
    const isFragment = originalTagName === 'Fragment' || originalTagName === 'React.Fragment';
    const isCustomComponent = /^[A-Z]/.test(originalTagName) && !isRouterLink && !isFragment;

    if (
      options.dashboardPage
      && ts.isJsxElement(node)
      && ['contextMenu', 'deletePopup', 'leavePopup'].includes(
        opening.attributes.properties.find((attribute) => (
          ts.isJsxAttribute(attribute) && attribute.name.getText(sourceFile) === 'id'
        ))?.initializer?.text,
      )
    ) {
      options.mappings?.push({
        source: `#${opening.attributes.properties.find((attribute) => (
          ts.isJsxAttribute(attribute) && attribute.name.getText(sourceFile) === 'id'
        ))?.initializer?.text}`,
        target: 'Livewire dashboard project actions and per-card ellipsis menu',
        reason: 'React DOM context-menu interactions are replaced with the existing authorized Livewire actions.',
      });

      return '';
    }

    if (isFragment) {
      return ts.isJsxElement(node) ? node.children.map(renderNode).join('') : '';
    }

    if (options.dashboardCard && originalTagName === 'i') {
      return '';
    }

    if (isCustomComponent) {
      const importedPath = bladeOutput ? importedComponentPath(originalTagName) : null;

      if (importedPath && options.inlineComponents) {
        if (componentStack.includes(importedPath)) {
          issue(opening.tagName, 'component_cycle', `React component "${originalTagName}" has a circular local import.`);

          return '';
        }

        const childProps = new Map();

        for (const attribute of opening.attributes.properties) {
          if (!ts.isJsxAttribute(attribute) || !ts.isIdentifier(attribute.name)) {
            continue;
          }

          if (!attribute.initializer) {
            childProps.set(attribute.name.text, true);
          } else if (ts.isStringLiteral(attribute.initializer)) {
            childProps.set(attribute.name.text, attribute.initializer.text);
          } else if (
            ts.isJsxExpression(attribute.initializer)
            && attribute.initializer.expression
          ) {
            const value = knownExpressionValue(attribute.initializer.expression, props);

            if (value.supported) {
              childProps.set(attribute.name.text, value.value);
            }
          }
        }

        const importedSource = fs.readFileSync(importedPath, 'utf8');
        const importedFile = ts.createSourceFile(
          importedPath,
          importedSource,
          ts.ScriptTarget.Latest,
          true,
          path.extname(importedPath).endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
        );

        if (importedFile.parseDiagnostics.length > 0) {
          issue(opening.tagName, 'component_parse_error', `React component "${originalTagName}" could not be parsed.`);

          return '';
        }

        const imported = mapperFor(
          importedFile,
          originalTagName,
          importedRouterLinkAliases(importedFile),
          colorTokens,
          {
            ...options,
            props: childProps,
            componentStack: [...componentStack, importedPath],
            rootNode: null,
            wrapTemplate: false,
            dashboardCard: options.dashboardPage && originalTagName === 'ProjectCard',
          },
        );

        issues.push(...imported.issues.map((item) => ({
          ...item,
          component: originalTagName,
          sourceFile: portablePath(path.relative(options.projectRoot, importedPath)),
        })));

        if (options.dashboardPage && originalTagName === 'ProjectCard') {
          const project = childProps.get('project');
          const projectId = project?.bladeExpression ?? null;
          const isOwner = childProps.get('owner') === true;

          if (!projectId) {
            issue(opening.tagName, 'unmapped_project_card', 'ProjectCard project data could not be mapped to a Livewire model.');

            return imported.body ?? '';
          }

          options.mappings?.push({
            source: 'ProjectCard ellipsis action menu',
            target: isOwner ? 'details menu with cloneProject and deleteProject' : 'details menu with cloneProject and leaveProject',
          });

          return `<div class="dashboard-project-card">${imported.body ?? ''}<div class="dashboard-project-menu"><button type="button" aria-label="Project actions"><i class="fa-solid fa-ellipsis-vertical" aria-hidden="true"></i></button><div class="dashboard-project-menu-items"><button wire:click="cloneProject('{{ ${projectId}->id }}')">Clone Project</button>${isOwner
            ? `<button wire:click="deleteProject('{{ ${projectId}->id }}')" onclick="return confirm('Delete this project?')">Delete Project</button>`
            : `<button wire:click="leaveProject('{{ ${projectId}->id }}')" onclick="return confirm('Leave this project?')">Leave Project</button>`}</div></div></div>`;
        }

        return imported.body ?? '';
      }

      issue(
        opening.tagName,
        'component_reference',
        `React component "${originalTagName}" needs a corresponding migrated Blade component.`,
        `<${originalTagName}>`,
      );

      return `<!-- TODO: Migrate React component ${originalTagName}. -->`;
    }

    if (bladeOutput && isRouterLink) {
      const destination = opening.attributes.properties.find((attribute) => (
        ts.isJsxAttribute(attribute) && attribute.name.getText(sourceFile) === 'to'
      ));
      const destinationValue = destination?.initializer && ts.isStringLiteral(destination.initializer)
        ? destination.initializer.text
        : null;

      if (destinationValue === '/logout') {
        const children = ts.isJsxElement(node) ? node.children.map(renderNode).join('') : '';

        return `<form method="POST" action="{{ route('logout') }}" class="react-mapped-logout">@csrf<button type="submit" class="react-mapped-logout-button">${children}</button></form>`;
      }
    }

    const tagName = isRouterLink ? 'a' : originalTagName;
    const attributes = renderAttributes(opening.attributes, isRouterLink);
    const isSelfClosing = ts.isJsxSelfClosingElement(node);

    if (voidElements.has(tagName.toLowerCase())) {
      return `<${tagName}${attributes} />`;
    }

    if (isSelfClosing) {
      return `<${tagName}${attributes}></${tagName}>`;
    }

    const children = ts.isJsxElement(node) ? node.children.map(renderNode).join('') : '';

    return `<${tagName}${attributes}>${children}</${tagName}>`;
  }

  function renderNode(node) {
    if (ts.isJsxText(node)) {
      return jsxText(node.text, bladeOutput);
    }

    if (ts.isJsxExpression(node)) {
      return renderExpression(node.expression);
    }

    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node) || ts.isJsxFragment(node)) {
      return renderElement(node);
    }

    issue(node, 'unsupported_jsx_node', 'JSX child node could not be mapped.');

    return '';
  }

  const componentNode = findComponentNode(sourceFile, componentName);

  if (!componentNode) {
    issue(sourceFile, 'component_not_found', `Could not find the top-level ${componentName} component.`);

    return { template: null, issues };
  }

  const returns = options.rootNode ? [options.rootNode] : findJsxReturns(componentNode);

  if (returns.length !== 1) {
    issue(
      componentNode,
      'multiple_or_missing_jsx_returns',
      `Expected one direct JSX return; found ${returns.length}. No template was generated.`,
    );

    return { template: null, issues };
  }

  const body = renderElement(returns[0]);
  const template = options.wrapTemplate === false
    ? body
    : bladeOutput
      ? `${body}\n`
      : `@verbatim\n${body}\n@endverbatim\n`;

  return { template, body, issues };
}

function readStyleFiles(stylesDirectory) {
  if (!fs.existsSync(stylesDirectory)) {
    throw new Error(`Styles directory not found: ${stylesDirectory}`);
  }

  return fs.readdirSync(stylesDirectory)
    .filter((fileName) => fileName.endsWith('.scss'))
    .sort()
    .map((fileName) => path.join(stylesDirectory, fileName));
}

function readSourceComponent(sourceRoot, componentName) {
  const filePath = path.join(sourceRoot, 'components', `${componentName}.tsx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Required source component not found: ${portablePath(path.relative(sourceRoot, filePath))}`);
  }

  const source = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  if (sourceFile.parseDiagnostics.length > 0) {
    throw new Error(`Required source component could not be parsed: ${componentName}`);
  }

  return sourceFile;
}

function readDefaultTheme(sourceRoot) {
  const themeProviderPath = path.join(sourceRoot, 'components', 'ThemeProvider.tsx');
  const themeProvider = ts.createSourceFile(
    themeProviderPath,
    fs.readFileSync(themeProviderPath, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  let themeName = null;

  function visit(node) {
    if (themeName || !ts.isParameter(node) || !ts.isObjectBindingPattern(node.name)) {
      ts.forEachChild(node, visit);

      return;
    }

    const initialTheme = node.name.elements.find((element) => (
      ts.isIdentifier(element.name) && element.name.text === 'initialTheme'
    ));

    if (initialTheme?.initializer && ts.isStringLiteral(initialTheme.initializer)) {
      themeName = initialTheme.initializer.text;
    }

    ts.forEachChild(node, visit);
  }

  visit(themeProvider);

  if (!themeName) {
    throw new Error('The default theme could not be read from ThemeProvider.tsx.');
  }

  const themePath = path.join(sourceRoot, 'themes', `${themeName}.json`);
  const theme = JSON.parse(fs.readFileSync(themePath, 'utf8'));

  if (!theme.colors || typeof theme.colors !== 'object' || Array.isArray(theme.colors)) {
    throw new Error(`The source theme has no color map: ${portablePath(path.relative(sourceRoot, themePath))}`);
  }

  const declarations = Object.entries(theme.colors).map(([name, value]) => {
    if (!/^[a-zA-Z][\w-]*$/.test(name) || typeof value !== 'string' || !/^#[\da-f]{3,8}$/i.test(value)) {
      throw new Error(`Unsupported source theme token: ${name}`);
    }

    return `  --${name}: ${value};`;
  });

  return {
    source: portablePath(path.relative(sourceRoot, themePath)),
    css: `:root {\n${declarations.join('\n')}\n}\n`,
  };
}

function applySourceHomePage(projectRoot, sourceRoot, outputDirectory, styleFiles) {
  const appFile = readSourceComponent(sourceRoot, 'App');
  const homeFile = readSourceComponent(sourceRoot, 'Home');
  const appComponent = findComponentNode(appFile, 'App');
  const homeComponent = findComponentNode(homeFile, 'Home');
  const headerNode = appComponent && findJsxElement(appComponent, 'header');
  const mainNode = homeComponent && findJsxElement(homeComponent, 'main');

  if (!headerNode || !mainNode) {
    throw new Error('The source App header or Home main element could not be mapped.');
  }

  const theme = readDefaultTheme(sourceRoot);
  const assets = new Map();
  const mappingOptions = {
    bladeOutput: true,
    inlineComponents: true,
    projectRoot,
    assets,
  };
  const header = mapperFor(
    appFile,
    'App',
    routerLinkAliasesFor(appFile),
    {},
    {
      ...mappingOptions,
      props: new Map([['page', 'home']]),
      rootNode: headerNode,
    },
  );
  const main = mapperFor(
    homeFile,
    'Home',
    routerLinkAliasesFor(homeFile),
    {},
    {
      ...mappingOptions,
      rootNode: mainNode,
    },
  );
  const issues = [...header.issues, ...main.issues];
  const unexpectedIssues = issues.filter((item) => !(
    item.type === 'dynamic_expression'
    && item.component === 'Example'
    && item.source?.startsWith('elements.map(')
  ));

  if (unexpectedIssues.length > 0) {
    throw new Error(`The homepage has unsupported source mappings: ${JSON.stringify(unexpectedIssues)}`);
  }

  const htmlPath = path.join(projectRoot, 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  const fontAwesomeScript = html.match(/<script\b(?=[^>]*fontawesome)[\s\S]*?<\/script>/i)?.[0];

  if (!fontAwesomeScript) {
    throw new Error('The source Font Awesome script was not found in index.html.');
  }

  const template = `<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SeriesMingle</title>
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#0a2553">
    <link rel="stylesheet" href="{{ asset('react-mapped/styles/app.css') }}">
    <link rel="stylesheet" href="{{ asset('react-mapped/styles/theme.css') }}">
    <link rel="stylesheet" href="{{ asset('react-mapped/styles/home.css') }}">
    ${fontAwesomeScript}
</head>
<body>
<div id="app">
    <div id="home">
        ${header.body}
        ${main.body}
    </div>
</div>
</body>
</html>
`;

  const outputViewPath = path.join(projectRoot, 'resources', 'views', 'home.blade.php');
  const assetDestinations = [...assets].map(([relativePath, sourcePath]) => {
    const assetPath = path.resolve(projectRoot, sourcePath);
    const relativeSourcePath = path.relative(projectRoot, assetPath);

    if (
      path.isAbsolute(relativeSourcePath)
      || relativeSourcePath === '..'
      || relativeSourcePath.startsWith(`..${path.sep}`)
      || !fs.existsSync(assetPath)
    ) {
      throw new Error(`Imported homepage asset is missing or outside the project: ${sourcePath}`);
    }

    return {
      relativePath,
      sourcePath: assetPath,
      destination: path.join(projectRoot, 'public', 'react-mapped', 'assets', relativePath),
    };
  });
  const sourceStyles = ['app', 'home'].map((styleName) => {
    const sourceStyle = styleFiles.find((filePath) => path.basename(filePath, '.scss') === styleName);
    const compiledPath = path.join(outputDirectory, 'styles', `${styleName}.css`);

    if (!sourceStyle || !fs.existsSync(compiledPath)) {
      throw new Error(`Required homepage stylesheet was not compiled: ${styleName}.scss`);
    }

    return {
      name: styleName,
      compiledPath,
      destination: path.join(projectRoot, 'public', 'react-mapped', 'styles', `${styleName}.css`),
    };
  });

  fs.mkdirSync(path.dirname(outputViewPath), { recursive: true });

  for (const { sourcePath, destination } of assetDestinations) {
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(sourcePath, destination);
  }

  const appliedStyles = [];

  for (const style of sourceStyles) {
    let css = fs.readFileSync(style.compiledPath, 'utf8');

    if (style.name === 'app') {
      css += `
#app header .react-mapped-logout {
  display: contents;
}
#app header nav .react-mapped-logout-button {
  align-self: center;
  border: 0;
  padding: 0;
  background: transparent;
  color: var(--linkTert);
  font: inherit;
  cursor: pointer;
}
#app header nav .react-mapped-logout-button:hover {
  color: var(--hoverSec);
}
#app #dashboard > header,
#app #project > header {
  box-sizing: content-box;
}
`;
    }

    fs.mkdirSync(path.dirname(style.destination), { recursive: true });
    fs.writeFileSync(style.destination, css);
    appliedStyles.push(portablePath(path.relative(projectRoot, style.destination)));
  }

  const themeDestination = path.join(projectRoot, 'public', 'react-mapped', 'styles', 'theme.css');
  fs.writeFileSync(themeDestination, theme.css);
  appliedStyles.splice(
    1,
    0,
    portablePath(path.relative(projectRoot, themeDestination)),
  );
  fs.writeFileSync(outputViewPath, template);

  return {
    view: portablePath(path.relative(projectRoot, outputViewPath)),
    styles: appliedStyles,
    assets: [...assets.keys()],
    themeSource: theme.source,
    issues,
  };
}

function applySourceAuthenticatedNavigation(projectRoot, sourceRoot) {
  const appFile = readSourceComponent(sourceRoot, 'App');
  const appComponent = findComponentNode(appFile, 'App');
  const headerNode = appComponent && findJsxElement(appComponent, 'header');
  const assets = new Map();

  if (!headerNode) {
    throw new Error('The source App header could not be mapped for authenticated pages.');
  }

  const views = [];

  for (const page of ['dashboard', 'project']) {
    const mapped = mapperFor(
      appFile,
      'App',
      routerLinkAliasesFor(appFile),
      {},
      {
        bladeOutput: true,
        inlineComponents: true,
        projectRoot,
        assets,
        props: new Map([['page', page]]),
        rootNode: headerNode,
      },
    );

    if (mapped.issues.length > 0) {
      throw new Error(`The ${page} navigation has unsupported source mappings: ${JSON.stringify(mapped.issues)}`);
    }

    const viewPath = path.join(
      projectRoot,
      'resources',
      'views',
      'components',
      'react-mapped',
      `nav-${page}.blade.php`,
    );

    fs.mkdirSync(path.dirname(viewPath), { recursive: true });
    fs.writeFileSync(
      viewPath,
      `${mapped.body.replace(/@(auth|else|endauth)/g, '\n@$1\n').trim()}\n`,
    );
    views.push(portablePath(path.relative(projectRoot, viewPath)));
  }

  const assetDestinations = [...assets].map(([relativePath, sourcePath]) => {
    const assetPath = path.resolve(projectRoot, sourcePath);
    const relativeSourcePath = path.relative(projectRoot, assetPath);

    if (
      path.isAbsolute(relativeSourcePath)
      || relativeSourcePath === '..'
      || relativeSourcePath.startsWith(`..${path.sep}`)
      || !fs.existsSync(assetPath)
    ) {
      throw new Error(`Imported navigation asset is missing or outside the project: ${sourcePath}`);
    }

    return {
      relativePath,
      sourcePath: assetPath,
      destination: path.join(projectRoot, 'public', 'react-mapped', 'assets', relativePath),
    };
  });

  for (const { sourcePath, destination } of assetDestinations) {
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(sourcePath, destination);
  }

  const layoutPath = path.join(projectRoot, 'resources', 'views', 'layouts', 'app.blade.php');

  if (!fs.existsSync(layoutPath)) {
    throw new Error('The authenticated app layout was not found.');
  }

  let layout = fs.readFileSync(layoutPath, 'utf8');
  const indexPath = path.join(projectRoot, 'index.html');
  const indexHtml = fs.readFileSync(indexPath, 'utf8');
  const fontAwesomeScript = indexHtml.match(/<script\b(?=[^>]*fontawesome)[\s\S]*?<\/script>/i)?.[0];

  if (!fontAwesomeScript) {
    throw new Error('The source Font Awesome script was not found in index.html.');
  }

  if (!layout.includes(fontAwesomeScript)) {
    const headEnd = layout.indexOf('</head>');

    if (headEnd < 0) {
      throw new Error('The authenticated app layout has no head section.');
    }

    layout = `${layout.slice(0, headEnd)}        ${fontAwesomeScript}\n${layout.slice(headEnd)}`;
  }

  const bodyMatch = layout.match(/(<body\b[^>]*>)[\s\S]*?(<\/body>)/);

  if (!bodyMatch) {
    throw new Error('The authenticated app layout has no body section.');
  }

  const body = `${bodyMatch[1]}
        <div id="app">
            {{ $slot }}
        </div>
        @livewireScripts
    ${bodyMatch[2]}`;
  layout = layout.replace(bodyMatch[0], body);
  fs.writeFileSync(layoutPath, layout);

  return {
    layout: portablePath(path.relative(projectRoot, layoutPath)),
    views,
    assets: [...assets.keys()],
    mappings: [{
      source: 'App header and Nav',
      target: 'source-mapped dashboard and project page headers',
    }],
  };
}

function applySourceDashboard(projectRoot, sourceRoot, outputDirectory, styleFiles) {
  const dashboardFile = readSourceComponent(sourceRoot, 'Dashboard');
  const dashboardNode = findComponentNode(dashboardFile, 'Dashboard');
  const mainNode = dashboardNode && findJsxElement(dashboardNode, 'main');

  if (!mainNode) {
    throw new Error('The source Dashboard main element could not be mapped.');
  }

  const mappings = [];
  const mapped = mapperFor(
    dashboardFile,
    'Dashboard',
    routerLinkAliasesFor(dashboardFile),
    {},
    {
      bladeOutput: true,
      inlineComponents: true,
      projectRoot,
      page: 'dashboard',
      dashboardPage: true,
      mappings,
      props: new Map([['isPageLoaded', true]]),
      rootNode: mainNode,
    },
  );
  const unexpectedIssues = mapped.issues.filter((item) => item.type !== 'dynamic_expression');

  if (unexpectedIssues.length > 0) {
    throw new Error(`The dashboard has unsupported source mappings: ${JSON.stringify(unexpectedIssues)}`);
  }

  const sourceExpressions = mapped.issues.filter((item) => item.type === 'dynamic_expression');

  if (sourceExpressions.length > 0) {
    throw new Error(`The dashboard has unmapped source expressions: ${JSON.stringify(sourceExpressions)}`);
  }

  const viewPath = path.join(projectRoot, 'resources', 'views', 'livewire', 'dashboard.blade.php');
  const sourceStyle = styleFiles.find((filePath) => path.basename(filePath, '.scss') === 'dash');
  const compiledStyle = path.join(outputDirectory, 'styles', 'dash.css');

  if (!sourceStyle || !fs.existsSync(compiledStyle)) {
    throw new Error('The source dashboard stylesheet was not compiled.');
  }

  const styleDestination = path.join(projectRoot, 'public', 'react-mapped', 'styles', 'dash.css');
  const view = `@push('styles')
    <link rel="stylesheet" href="{{ asset('react-mapped/styles/dash.css') }}">
@endpush
<div id="dashboard">
    @include('components.react-mapped.nav-dashboard')
${mapped.body}
</div>
`;

  fs.mkdirSync(path.dirname(viewPath), { recursive: true });
  fs.mkdirSync(path.dirname(styleDestination), { recursive: true });
  fs.writeFileSync(viewPath, view);
  fs.copyFileSync(compiledStyle, styleDestination);
  fs.appendFileSync(styleDestination, `
#dashboard > main .dashboard-project-card {
  min-width: 200px;
  width: 200px;
  position: relative;
}

#dashboard > main .dashboard-project-card > a {
  display: block;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  min-width: 0;
}

#dashboard > main .dashboard-project-card > a > div > h2 {
  font-family: "Fredoka One";
  font-size: 1.5em;
  line-height: normal;
  margin-block: 0.83em;
  font-weight: normal;
}

#dashboard > main h1 {
  font-size: 2em;
  line-height: normal;
  margin-bottom: 0.67em;
}

#dashboard > main .projects-list > h2 {
  position: relative;
  z-index: 1;
  font-size: 1.5em;
  line-height: normal;
}

#dashboard > main .projects-list::before {
  content: "";
  display: block;
  position: absolute;
  top: 13px;
  left: 0;
  width: 100%;
  height: 5px;
  background-color: var(--bgBorder);
  z-index: 0;
}

#dashboard > main .projects-list > h2::after {
  content: none;
}

#dashboard > main .dashboard-project-card .project-container > p {
  margin-block: 1em;
}

#dashboard > main .dashboard-project-menu {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
}

#dashboard > main .dashboard-project-menu > button:first-child {
  transition: var(--transition-time);
  border: 0;
  background: transparent;
  color: var(--linkMain);
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;
  font-size: 1rem;
}

#dashboard > main .dashboard-project-menu-items {
  position: absolute;
  top: 100%;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: 8px;
  min-width: 130px;
  padding: 8px 0;
  border: 1px solid var(--bgBorder);
  border-radius: 8px;
  background: var(--bgMain);
  font-size: 0.75em;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--transition-time);
}

#dashboard > main .dashboard-project-menu:hover .dashboard-project-menu-items,
#dashboard > main .dashboard-project-menu:focus-within .dashboard-project-menu-items {
  opacity: 1;
  pointer-events: all;
}

#dashboard > main .dashboard-project-menu-items button {
  width: 100%;
  padding: 5px 15px;
  margin: 0;
  border: none;
  border-radius: 0;
  background: none;
  color: var(--textSec);
  text-align: left;
  user-select: none;
}

#dashboard > main .dashboard-project-menu-items button:hover {
  color: var(--bgBorder);
  background: #00000055;
}

#dashboard > main .dashboard-project-menu > button:first-child:hover {
  color: var(--hoverMain);
  border: 0;
  background: transparent;
}

`);

  return {
    view: portablePath(path.relative(projectRoot, viewPath)),
    styles: [{
      source: portablePath(path.relative(sourceRoot, sourceStyle)),
      compiled: 'styles/dash.css',
      destination: portablePath(path.relative(projectRoot, styleDestination)),
    }],
    mappings,
    issues: mapped.issues,
  };
}

function applySourceProjectStyles(projectRoot, sourceRoot, outputDirectory, styleFiles) {
  const sourceStyle = styleFiles.find((filePath) => path.basename(filePath, '.scss') === 'project');
  const compiledStyle = path.join(outputDirectory, 'styles', 'project.css');
  const sourceSearchModalStyle = styleFiles.find((filePath) => path.basename(filePath, '.scss') === 'SearchModal');
  const compiledSearchModalStyle = path.join(outputDirectory, 'styles', 'SearchModal.css');

  if (!sourceStyle || !fs.existsSync(compiledStyle)) {
    throw new Error('The source project stylesheet was not compiled.');
  }
  if (!sourceSearchModalStyle || !fs.existsSync(compiledSearchModalStyle)) {
    throw new Error('The source search modal stylesheet was not compiled.');
  }

  const styleDestination = path.join(projectRoot, 'public', 'react-mapped', 'styles', 'project.css');
  const searchModalStyleDestination = path.join(projectRoot, 'public', 'react-mapped', 'styles', 'SearchModal.css');
  const viewPath = path.join(projectRoot, 'resources', 'views', 'livewire', 'project-editor.blade.php');

  if (!fs.existsSync(viewPath)) {
    throw new Error('The Livewire project editor view was not found.');
  }

  let currentView = fs.readFileSync(viewPath, 'utf8');
  const selectorMappings = [
    {
      source: '#project-details',
      from: '<div id="project-details" class="sm-fieldset mb-8">\n        <legend class="sm-legend">Schedule Details</legend>',
      to: '<div id="project-details">',
    },
    {
      source: '#layerContainer',
      from: '<div id="layerContainer" class="sm-fieldset mb-8">\n        <legend class="sm-legend">Layers</legend>',
      to: '<fieldset id="layerContainer"><details open><summary><legend>Layers</legend></summary>',
    },
  ];
  const layerControls = currentView.match(/        <div class="flex justify-between items-center mb-4">\r?\n[\s\S]*?        <\/div>\r?\n\r?\n/g) ?? [];

  if (layerControls.length > 1) {
    throw new Error(`Project layer controls expected at most one source-mapped target, found ${layerControls.length}.`);
  }

  if (layerControls.length === 1) {
    currentView = currentView.replace(layerControls[0], '');
  }

  const mappedEntryMarkup = `@elseif($itemTitle)
                                    <div class="entry" wire:key="entry-{{ $index }}-{{ $entryIndex }}"
                                        wire:sort:item="'{{ $index }}-{{ $entryIndex }}'">
                                        @php
                                            $entryType = data_get($itemData, 'type');
                                        @endphp
                                        <span class="left-icons">
                                            @if(in_array($entryType, ['tv', 'movie'], true))
                                                <i class="refetch-icon fa-solid fa-rotate"
                                                    wire:click="refreshMedia({{ $index }}, {{ $entryIndex }})"
                                                    title="Refetch Media" role="button" tabindex="0"
                                                    aria-label="Refetch media"
                                                    wire:keydown.enter="refreshMedia({{ $index }}, {{ $entryIndex }})"
                                                    wire:keydown.space.prevent="refreshMedia({{ $index }}, {{ $entryIndex }})"
                                                    wire:loading.class="fa-spin"
                                                    wire:target="refreshMedia({{ $index }}, {{ $entryIndex }})"></i>
                                            @endif
                                            <i class="handle fa-solid fa-grip-vertical" wire:sort:handle></i>
                                        </span>
                                        @if(in_array($entryType, ['custom', 'tv'], true))
                                            @php
                                                $settingFields = $entryType === 'custom'
                                                    ? ['repeat', 'offset', 'term', 'runtime']
                                                    : ['start', 'end'];
                                                $settingLabels = $entryType === 'custom'
                                                    ? ['Repeat', 'Offset', 'Term', 'Duration (mins)']
                                                    : ['Start', 'End'];
                                                $settingKey = $entryType.'-'.data_get($item, 'ref.1');
                                                $settingIndex = $entrySettings[$settingKey] ?? 0;
                                                $settingField = $settingFields[$settingIndex] ?? $settingFields[0];
                                                $settingLabel = $settingLabels[$settingIndex] ?? $settingLabels[0];
                                                $showSeasons = is_array(data_get($itemData, 'seasons'))
                                                    ? data_get($itemData, 'seasons')
                                                    : [];
                                                $startParts = explode(':', (string) data_get($item, 'start', ''));
                                                $endParts = explode(':', (string) data_get($item, 'end', ''));
                                                $seasonsForSetting = $showSeasons;
                                                if ($entryType === 'tv' && $settingField === 'start' && array_key_exists('end', $item)) {
                                                    $seasonsForSetting = array_slice($showSeasons, 0, (int) ($endParts[0] ?? ''));
                                                } elseif ($entryType === 'tv' && $settingField === 'end' && data_get($item, 'start')) {
                                                    $startSeasonIndex = collect($showSeasons)->search(
                                                        fn (array $season) => (int) ($season['season'] ?? 0) >= (int) ($startParts[0] ?? 0) - 1,
                                                    );
                                                    $seasonsForSetting = array_slice(
                                                        $showSeasons,
                                                        $startSeasonIndex === false ? -1 : $startSeasonIndex,
                                                    );
                                                }
                                            @endphp
                                            <span class="setting">
                                                <button type="button" class="setting-label"
                                                    wire:click="cycleEntrySetting({{ $index }}, {{ $entryIndex }})">
                                                    <i class="fa-solid fa-sort"></i>{{ $settingLabel }}:
                                                </button>
                                                @if($entryType === 'tv')
                                                    <select class="value"
                                                        wire:change="updateTvRange({{ $index }}, {{ $entryIndex }}, '{{ $settingField }}', $event.target.value)">
                                                        @foreach($seasonsForSetting as $season)
                                                            @php
                                                                $episodesForSetting = is_array($season['episodes'] ?? null)
                                                                    ? $season['episodes']
                                                                    : [];
                                                                if ($settingField === 'start' && !empty($item['end'])) {
                                                                    $episodesForSetting = array_slice($episodesForSetting, 0, (int) ($endParts[1] ?? ''));
                                                                }
                                                            @endphp
                                                            <optgroup label="Season {{ $season['season'] }}">
                                                                @foreach($episodesForSetting as $episode)
                                                                    <option value="{{ $season['season'].':'.$episode['episode'] }}"
                                                                        @selected((string) data_get($item, $settingField, '') === (string) $season['season'].':'.(string) $episode['episode'])>{{ 'S'.$season['season'].'E'.$episode['episode'].': '.$episode['title'] }}</option>
                                                                @endforeach
                                                            </optgroup>
                                                        @endforeach
                                                    </select>
                                                @else
                                                    @php
                                                        $settingDefault = ['repeat' => 1, 'offset' => 0, 'term' => 'Part', 'runtime' => 30][$settingField];
                                                        $settingValue = data_get($itemData, $settingField, $settingDefault);
                                                        if (in_array($settingField, ['repeat', 'runtime'], true)) {
                                                            $settingValue = max((int) $settingValue, 1);
                                                        } elseif ($settingField === 'offset') {
                                                            $settingValue = max((int) $settingValue, 0);
                                                        }
                                                    @endphp
                                                    <input class="value" type="{{ $settingField === 'term' ? 'text' : 'number' }}"
                                                        @if($settingField !== 'term') min="{{ $settingField === 'offset' ? 0 : 1 }}" @endif
                                                        value="{{ $settingValue }}"
                                                        wire:change="updateCustomSetting({{ $index }}, {{ $entryIndex }}, '{{ $settingField }}', $event.target.value)">
                                                @endif
                                            </span>
                                        @endif
                                        <div class="option"><div>
                                        <input type="text" class="entry-title" value="{{ $itemTitle }}"
                                            size="{{ max((int) (mb_strlen($itemTitle) * 0.8), 1) }}"
                                            aria-label="Entry title"
                                            wire:change="updateEntryTitle({{ $index }}, {{ $entryIndex }}, $event.target.value)">
                                        </div></div>
                                        <button type="button" wire:click="removeEntry({{ $index }}, {{ $entryIndex }})"
                                            aria-label="Remove entry">&times;</button>
                                    </div>
                                @endif`;

  const canonicalLayerLoop = `@forelse($layers as $index => $layer)
                <fieldset class="layer" id="layer-{{ $index }}" wire:key="layer-{{ $index }}">
                    <details open>
                        <summary><legend><input type="text" class="layer-title" aria-label="Layer title"
                            size="{{ max(mb_strlen($titles[$index] ?? 'Layer '.($index + 1)), 1) }}"
                            wire:model.blur="titles.{{ $index }}" wire:change="save"
                            placeholder="Layer {{ $index + 1 }}"></legend></summary>
                        <div class="options" wire:sort="moveEntry($item, $position, $id)"
                            wire:sort:group="project-entries" wire:sort:group-id="{{ $index }}"
                            wire:sort:config="{ forceFallback: true, fallbackTolerance: 10 }">
                            @foreach($layer as $entryIndex => $item)
                                @php
                                    $itemData = is_array($item) && isset($item['ref']) && is_array($item['ref'])
                                            ? data_get($mediaData, implode('.', $item['ref']))
                                            : (is_array($item) && isset($item['id']) ? ($mediaData[$item['id']] ?? null) : null);
                                    $itemTitle = data_get($itemData, 'userTitle')
                                            ?: data_get($itemData, 'title')
                                            ?: data_get($itemData, 'show_title')
                                            ?: data_get($itemData, 'name')
                                            ?: (is_array($item) ? ($item['title'] ?? null) : null);
                                @endphp
                                @if(is_array($item) && array_key_exists('barrier', $item))
                                    <div class="barrier" aria-label="Schedule barrier"
                                        wire:key="entry-{{ $index }}-{{ $entryIndex }}"
                                        wire:sort:item="'{{ $index }}-{{ $entryIndex }}'">
                                        <span class="left-icons"><i class="handle fa-solid fa-grip-vertical" wire:sort:handle></i></span>
                                            <label for="barrier-{{ $index }}-{{ $entryIndex }}">Position (Percentage):</label>
                                            <input id="barrier-{{ $index }}-{{ $entryIndex }}" type="number" min="0" max="100"
                                                wire:model.blur="layers.{{ $index }}.{{ $entryIndex }}.barrier"
                                                wire:change="save" aria-label="Barrier position">
                                            <span>Barrier</span>
                                            <button type="button" wire:click="removeEntry({{ $index }}, {{ $entryIndex }})"
                                                aria-label="Remove barrier">&times;</button>
                                    </div>
                                @elseif(is_string($item))
                                    <div class="new" wire:key="entry-{{ $index }}-{{ $entryIndex }}"
                                        wire:sort:item="'{{ $index }}-{{ $entryIndex }}'">
                                        <span class="left-icons"><i class="handle fa-solid fa-grip-vertical" wire:sort:handle></i></span>
                                            <input type="text" value="{{ $item }}" readonly aria-label="Unresolved entry">
                                            <button type="button" wire:click="removeEntry({{ $index }}, {{ $entryIndex }})"
                                                aria-label="Remove entry">&times;</button>
                                    </div>
                                ${mappedEntryMarkup}
                            @endforeach
                            <button type="button" wire:click="openAddEntryModal({{ $index }})" class="add-entry-btn">
                                <span>＋</span> Add Entry
                            </button>
                        </div>
                        <button type="button" wire:click="removeLayer({{ $index }})" aria-label="Remove layer">&times;</button>
                    </details>
                </fieldset>
            @empty
            @endforelse`;

  if (!currentView.includes('<div class="project-content">')) {
    const headerControls = currentView.match(/    <!-- Header Controls -->[\s\S]*?    <!-- Title & Description -->/g) ?? [];

    if (headerControls.length !== 1) {
      throw new Error(`Project page header controls expected one source-mapped target, found ${headerControls.length}.`);
    }

    currentView = currentView.replace(
      headerControls[0],
      '    <!-- Title & Description -->',
    );

    for (const mapping of selectorMappings) {
      const count = currentView.split(mapping.from).length - 1;
      const mappedCount = currentView.split(mapping.to).length - 1;

      if (count === 1 && mappedCount === 0) {
        currentView = currentView.replace(mapping.from, mapping.to);
      } else if (count !== 0 || mappedCount !== 1) {
        throw new Error(`Project page selector mapping "${mapping.source}" expected one target, found ${count}.`);
      }
    }

    const titleInput = '<input type="text" wire:model.blur="title" wire:change="save" placeholder="Schedule Title"\n               class="w-full text-xl font-bold bg-[#0d1626] border border-[#0095fa] text-[#bfbf30] p-2 rounded-sm mb-3">';
    const sourceTitleInput = '<input type="text" wire:model.blur="title" wire:change="save" size="{{ max(mb_strlen($title), 1) }}" class="setTitle showTitle" aria-label="Schedule title">';
    const descriptionInput = '<textarea wire:model.blur="description" wire:change="save" placeholder="Description or notes..."\n                  class="w-full bg-[#0d1626] border border-[#0095fa] text-xs text-white p-2 rounded-sm h-16 resize-none"></textarea>';
    const sourceDescriptionInput = '<textarea wire:model.blur="description" wire:change="save" class="setDescription" rows="1" aria-label="Schedule description"></textarea>';

    if (!currentView.includes(titleInput) || !currentView.includes(descriptionInput)) {
      throw new Error('Project title and description fields could not be mapped to the source layout.');
    }

    currentView = currentView
      .replace(titleInput, sourceTitleInput)
      .replace(descriptionInput, sourceDescriptionInput)
      .replace('<div class="max-w-7xl mx-auto px-4 py-6">', '<div class="project-content">')
      .replace('<div class="space-y-4 options">', '<div class="layers">');

    const layerLoop = currentView.match(/@forelse\(\$layers as \$index => \$layer\)[\s\S]*?@endforelse/);

    if (!layerLoop) {
      throw new Error('Project layer loop could not be mapped to source layer markup.');
    }

    currentView = currentView.replace(layerLoop[0], canonicalLayerLoop);

    const projectLayersEnd = `        </div>
    </div>

    <!-- Schedule Viewer Component -->
    <x-schedule-viewer :schedule="$schedule" />`;

    if (!currentView.includes(projectLayersEnd)) {
      throw new Error('Project layer section could not be closed after mapping.');
    }

    currentView = currentView.replace(
      projectLayersEnd,
      `        </div>
        <button type="button" wire:click="addLayer" class="sm-button">New Layer</button>
    </details>
</fieldset>`,
    );
  }

  const existingLayerLoop = currentView.match(/@forelse\(\$layers as \$index => \$layer\)[\s\S]*?@endforelse/);

  if (!existingLayerLoop) {
    throw new Error('Project layer loop could not be normalized to source markup.');
  }

  currentView = currentView.replace(existingLayerLoop[0], canonicalLayerLoop);

  if (!currentView.includes('@if($mediaRefreshError)')) {
    const projectDetails = currentView.match(/<div id="project-details">[\s\S]*?<\/div>/g) ?? [];

    if (projectDetails.length !== 1) {
      throw new Error(`Project details section expected one target for refresh errors, found ${projectDetails.length}.`);
    }

    currentView = currentView.replace(
      projectDetails[0],
      `${projectDetails[0]}\n    @if($mediaRefreshError)\n        <p class="error" role="alert">{{ $mediaRefreshError }}</p>\n    @endif`,
    );
  }

  if (!currentView.includes('class="entry-title"')) {
    const legacyLayerMappings = [
      [
        '<fieldset class="layer" id="layer-{{ $index }}">',
        '<fieldset class="layer" id="layer-{{ $index }}" wire:key="layer-{{ $index }}">',
      ],
      [
        '<summary><legend><span>Layer {{ $index + 1 }}</span></legend></summary>',
        `<summary><legend><input type="text" class="layer-title" aria-label="Layer title"
                            size="{{ max(mb_strlen($titles[$index] ?? 'Layer '.($index + 1)), 1) }}"
                            wire:model.blur="titles.{{ $index }}" wire:change="save"
                            placeholder="Layer {{ $index + 1 }}"></legend></summary>`,
      ],
      ['@foreach($layer as $item)', '@foreach($layer as $entryIndex => $item)'],
      [
        '<span class="barrier" aria-label="Schedule barrier"></span>',
        `<div class="barrier" aria-label="Schedule barrier">
                                        <label for="barrier-{{ $index }}-{{ $entryIndex }}">Position (Percentage):</label>
                                        <input id="barrier-{{ $index }}-{{ $entryIndex }}" type="number" min="0" max="100"
                                            wire:model.blur="layers.{{ $index }}.{{ $entryIndex }}.barrier"
                                            wire:change="save" aria-label="Barrier position">
                                        <span>Barrier</span>
                                        <button type="button" wire:click="removeEntry({{ $index }}, {{ $entryIndex }})"
                                            aria-label="Remove barrier">&times;</button>
                                    </div>`,
      ],
      [
        '<div class="new"><input type="text" value="{{ $item }}" readonly aria-label="Unresolved entry"></div>',
        `<div class="new">
                                        <input type="text" value="{{ $item }}" readonly aria-label="Unresolved entry">
                                        <button type="button" wire:click="removeEntry({{ $index }}, {{ $entryIndex }})"
                                            aria-label="Remove entry">&times;</button>
                                    </div>`,
      ],
      [
        '<div class="entry">{{ $itemTitle }}</div>',
        `<div class="entry">
                                        <input type="text" class="entry-title" value="{{ $itemTitle }}"
                                            size="{{ max((int) (mb_strlen($itemTitle) * 0.8), 1) }}"
                                            aria-label="Entry title"
                                            wire:change="updateEntryTitle({{ $index }}, {{ $entryIndex }}, $event.target.value)">
                                        <button type="button" wire:click="removeEntry({{ $index }}, {{ $entryIndex }})"
                                            aria-label="Remove entry">&times;</button>
                                    </div>`,
      ],
    ];

    for (const [from, to] of legacyLayerMappings) {
      const count = currentView.split(from).length - 1;
      if (count !== 1) {
        throw new Error(`Project layer mapping expected one legacy fragment, found ${count}: ${from}`);
      }
      currentView = currentView.replace(from, to);
    }
  }

  currentView = currentView.replace(/\bstrlen\(/g, 'mb_strlen(');

  const entrySizeAttribute = 'size="{{ max((int) (mb_strlen($itemTitle) * 0.8), 1) }}"';

  if (!currentView.includes(entrySizeAttribute)) {
    const legacySizeAttributes = [
      'size="{{ max(strlen($itemTitle), 1) }}"',
      'size="{{ max((int) (strlen($itemTitle) * 0.8), 1) }}"',
    ];
    const legacySizeAttribute = legacySizeAttributes.find((attribute) => currentView.includes(attribute));
    const entryTitleInput = '<input type="text" class="entry-title" value="{{ $itemTitle }}"';
    const count = currentView.split(entryTitleInput).length - 1;

    if (count !== 1) {
      throw new Error(`Project entry title sizing expected one input, found ${count}.`);
    }

    if (legacySizeAttribute) {
      currentView = currentView.replace(legacySizeAttribute, entrySizeAttribute);
    } else {
      currentView = currentView.replace(
        entryTitleInput,
        `${entryTitleInput}\n                                            ${entrySizeAttribute}`,
      );
    }
  }

  currentView = currentView.replace(
    `wire:click="$set('activeTargetLayer', {{ $index }})"`,
    'wire:click="openAddEntryModal({{ $index }})"',
  );

  if (currentView.includes('<!-- Search Modal / Overlay -->')) {
    const modalMarker = '    <!-- Search Modal / Overlay -->';
    const modalStart = currentView.indexOf(modalMarker);
    const modalIfStart = currentView.indexOf('@if(', modalStart);

    if (modalStart < 0 || modalIfStart < 0) {
      throw new Error('Project search modal could not be mapped to source layer actions.');
    }

    let modalDepth = 0;
    let modalEnd = -1;
    const conditionalDirective = /@if\b|@endif\b/g;
    conditionalDirective.lastIndex = modalIfStart;
    let directive;

    while ((directive = conditionalDirective.exec(currentView)) !== null) {
      modalDepth += directive[0] === '@if' ? 1 : -1;
      if (modalDepth === 0) {
        modalEnd = conditionalDirective.lastIndex;
        break;
      }
    }

    if (modalEnd < 0) {
      throw new Error('Project search modal has unbalanced Blade conditionals.');
    }

    const sourceSearchModal = `    <!-- Search Modal / Overlay -->
    @if($activeTargetLayer !== null)
            <div class="layer">
                <div class="search-modal-overlay" role="dialog" aria-modal="true">
                    <div class="search-modal">
                        <div class="search-modal-header">
                            <input class="search-input" type="text" wire:model.live.debounce.750ms="searchQuery"
                                wire:keydown.enter="searchNow"
                                placeholder="Search {{ ['tv-movies' => 'TV / Movies', 'books' => 'Books', 'other' => 'Other'][$searchTab] ?? 'TV / Movies' }}..."
                                aria-label="Search {{ ['tv-movies' => 'TV / Movies', 'books' => 'Books', 'other' => 'Other'][$searchTab] ?? 'TV / Movies' }}"
                                @disabled($searchTab === 'other') autofocus>
                            <button type="button" class="close-btn" wire:click="closeAddEntryModal" aria-label="Close">&times;</button>
                        </div>
                        <div class="tabs">
                            <button type="button" class="{{ $searchTab === 'tv-movies' ? 'active' : '' }}"
                                wire:click="setSearchTab('tv-movies')">TV / Movies</button>
                            <button type="button" class="{{ $searchTab === 'books' ? 'active' : '' }}"
                                wire:click="setSearchTab('books')">Books</button>
                            <button type="button" class="{{ $searchTab === 'other' ? 'active' : '' }}"
                                wire:click="setSearchTab('other')">Other</button>
                        </div>
                        @if($searchError)
                            <div class="error">{{ $searchError }}</div>
                        @endif
                        <div class="results">
                            @if($searchTab !== 'other' && empty($searchResults))
                                <div class="no-search-message">
                                    <span wire:loading wire:target="searchQuery, setSearchTab, searchNow">Fetching results...</span>
                                    <span wire:loading.remove wire:target="searchQuery, setSearchTab, searchNow">Type to search.</span>
                                </div>
                            @endif
                            @if($searchTab === 'other')
                                <div class="result-item" wire:click="addBarrier({{ $activeTargetLayer }})">
                                    <img src="https://placehold.co/200x300?text=No+Image+Available" alt="Add Barrier" style="background: #eee">
                                    <div style="flex: 1">
                                        <span style="font-weight: bold">Add Barrier</span>
                                        <div class="result-description" style="font-size: 0.95em; color: #666; margin-top: 0.2em">Insert a barrier to split your schedule into sections.</div>
                                    </div>
                                </div>
                                <div class="result-item" wire:click="addCustomEntry({{ $activeTargetLayer }})">
                                    <img src="https://placehold.co/200x300?text=No+Image+Available" alt="Add Custom Entry" style="background: #eee">
                                    <div style="flex: 1">
                                        <span style="font-weight: bold">Add Custom Entry</span>
                                        <div class="result-description" style="font-size: 0.95em; color: #666; margin-top: 0.2em">Create a custom entry for activities, events, or anything else.</div>
                                    </div>
                                </div>
                            @else
                                @foreach($searchResults as $resultIndex => $result)
                                    @php
                                        $date = (string) ($result['release_date'] ?? $result['first_air_date'] ?? '');
                                        $year = (string) ($result['year'] ?? $result['publishedYear'] ?? substr($date, 0, 4));
                                        $displayTitle = (string) ($result['title'] ?? '');
                                        if ($searchTab === 'tv-movies') {
                                            $typeLabel = ($result['media_type'] ?? null) === 'tv' ? 'TV' : (($result['media_type'] ?? null) === 'movie' ? 'Movie' : '');
                                            $displayTitle .= $typeLabel !== ''
                                                ? ' ('.$typeLabel.($year !== '' ? ', '.$year : '').')'
                                                : ($year !== '' ? ' ('.$year.')' : '');
                                        } else {
                                            $displayTitle .= $year !== '' ? ' ('.$year.')' : '';
                                        }
                                        $descriptionText = $result['overview'] ?? $result['description'] ?? '';
                                        $imageUrl = $result['image'] ?? 'https://placehold.co/200x300?text=No+Image+Available';
                                    @endphp
                                        <div class="result-item" wire:key="search-result-{{ $searchTab }}-{{ $resultIndex }}"
                                            wire:click="selectSearchResult({{ $activeTargetLayer }}, {{ $resultIndex }})"
                                            wire:loading.class="search-result-loading" wire:target="selectSearchResult">
                                        <img src="{{ $imageUrl }}" alt="{{ $result['title'] ?? '' }}" style="background: #eee">
                                        <div style="flex: 1">
                                            <span style="font-weight: bold">{{ $displayTitle }}</span>
                                            @if($descriptionText !== '')
                                                <div class="result-description" style="font-size: 0.95em; color: #666; margin-top: 0.2em">{{ $descriptionText }}</div>
                                            @endif
                                        </div>
                                    </div>
                                @endforeach
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @endif`;

    currentView = currentView.slice(0, modalStart) + sourceSearchModal + currentView.slice(modalEnd);
  } else {
    throw new Error('Project search modal marker was not found.');
  }

  if (!currentView.includes('Type to search.')) {
    const resultsContainer = '                <div class="max-h-60 overflow-y-auto space-y-2">\n';
    const count = currentView.split(resultsContainer).length - 1;

    if (count !== 1) {
      throw new Error(`Project search results container expected one target, found ${count}.`);
    }

    currentView = currentView.replace(
      resultsContainer,
      `${resultsContainer}                    @if($searchQuery === '' && empty($searchResults))\n                        <p class="text-center text-gray-400 text-xs py-4">Type to search.</p>\n                    @endif\n`,
    );
  }

  const styleStack = `@push('styles')
    <link rel="stylesheet" href="{{ asset('react-mapped/styles/project.css') }}">
    <link rel="stylesheet" href="{{ asset('react-mapped/styles/SearchModal.css') }}">
@endpush
`;
  const projectView = currentView.includes('id="project"')
    ? currentView
    : `<div id="project">
    @include('components.react-mapped.nav-project')
    <main class="fadein">
${currentView.trim()}
    </main>
</div>`;
  const projectViewWithHeader = projectView.includes("@include('components.react-mapped.nav-project')")
    ? projectView
    : projectView.replace('<div id="project">', '<div id="project">\n    @include(\'components.react-mapped.nav-project\')');
  const viewWithMainClass = projectViewWithHeader.replace(/<main>(?=\s*<div)/, '<main class="fadein">');
  let view = viewWithMainClass.includes("asset('react-mapped/styles/project.css')")
    ? viewWithMainClass
    : `${styleStack}${viewWithMainClass}`;
  if (!view.includes("asset('react-mapped/styles/SearchModal.css')")) {
    view = view.replace(
      `    <link rel="stylesheet" href="{{ asset('react-mapped/styles/project.css') }}">`,
      `    <link rel="stylesheet" href="{{ asset('react-mapped/styles/project.css') }}">\n    <link rel="stylesheet" href="{{ asset('react-mapped/styles/SearchModal.css') }}">`,
    );
  }
  const projectStyles = `${fs.readFileSync(compiledStyle, 'utf8')}
#project > main > .project-content {
  max-width: none;
  margin: 0;
  padding: 0;
}

#project .error {
  color: var(--textSec);
  text-align: center;
}

#project-details input.setTitle {
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--textSec);
  text-align: center;
  font-size: 1.5em;
  line-height: normal;
  font-weight: normal;
  outline: none;
}

#project-details textarea.setDescription {
  box-sizing: content-box;
  width: fit-content;
  max-width: calc(100vw - 4em);
  background: var(--bgMain);
  color: var(--textSec);
  border: 2px solid var(--bgBorder);
  padding: 5px 10px;
  margin-top: 10px;
  text-align: center;
}

#project-details textarea.setDescription {
  font: inherit;
  line-height: normal;
  min-height: 2.5em;
  resize: none;
}

#layerContainer > details > summary {
  width: max-content;
}

#layerContainer > details > .layers,
#layerContainer > details > .layers > .layer > details > .options {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

#layerContainer > details > .layers > .layer {
  flex: 1 1 100%;
}

#layerContainer > details > .layers > .layer .entry {
  display: inline-block;
  min-height: 35px;
  align-content: center;
  padding: 0.3em 0.5em;
  border: var(--buttonSec) 2px solid;
  border-radius: 0.3em;
  background-color: var(--buttonBg);
  color: var(--linkSec);
}

#layerContainer .sortable-ghost {
  border-style: dashed;
  opacity: 0.5;
  filter: grayscale(0.5);
}

#layerContainer > details > .layers > .layer .entry-title,
#layerContainer > details > .layers > .layer > details > summary legend .layer-title {
  appearance: none;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  outline: none;
}

#layerContainer > details > .layers > .layer .entry-title {
  font-size: 0.875em;
  max-width: calc(100vw - 160px);
  padding: 0;
}

#layerContainer > details > .layers > .layer > details > summary legend .layer-title {
  max-width: calc(100vw - 100px);
  padding: 0;
}

#layerContainer > details > .layers > .layer > details > summary legend .layer-title::placeholder {
  color: inherit;
  opacity: 0.5;
}

#layerContainer > details > .layers > .layer > details > summary {
  list-style-position: outside;
  margin-top: -20px;
  margin-left: 20px;
  width: max-content;
}

#layerContainer > details > .layers > .layer > details > summary legend {
  width: fit-content;
  padding: 5px 10px;
  margin-left: -25px;
  background-color: var(--bgSec);
}

#layerContainer > details > .layers > .layer > details > button[aria-label="Remove layer"] {
  position: absolute;
  right: 0.75em;
  top: 0.5em;
  bottom: 0.5em;
}

#project .search-modal .result-item.search-result-loading {
  opacity: 0.6;
  pointer-events: none;
}
`;

  fs.mkdirSync(path.dirname(styleDestination), { recursive: true });
  fs.mkdirSync(path.dirname(searchModalStyleDestination), { recursive: true });
  fs.writeFileSync(viewPath, view);
  fs.writeFileSync(styleDestination, projectStyles);
  fs.copyFileSync(compiledSearchModalStyle, searchModalStyleDestination);

  return {
    view: portablePath(path.relative(projectRoot, viewPath)),
    mappings: [
      ...selectorMappings.map(({ source }) => ({
      source,
      target: source,
      })),
      { source: 'Project title and description', target: 'editable source-matched project heading and description' },
      { source: 'Project layer entries', target: 'source-matched layers with titles resolved from migrated media data' },
      { source: 'Schedule visualization', target: 'deferred until the source scheduler is ported' },
    ],
    styles: [
      {
        source: portablePath(path.relative(sourceRoot, sourceStyle)),
        compiled: 'styles/project.css',
        destination: portablePath(path.relative(projectRoot, styleDestination)),
      },
      {
        source: portablePath(path.relative(sourceRoot, sourceSearchModalStyle)),
        compiled: 'styles/SearchModal.css',
        destination: portablePath(path.relative(projectRoot, searchModalStyleDestination)),
      },
    ],
  };
}

function applySourceAuthPages(projectRoot, sourceRoot, outputDirectory, styleFiles) {
  const loginFile = readSourceComponent(sourceRoot, 'Login');
  const loginNode = findComponentNode(loginFile, 'LogIn');
  const mainNode = loginNode && findJsxElement(loginNode, 'main');
  const sourceText = loginFile.getText();

  if (
    !mainNode
    || !sourceText.includes('Create Account')
    || !sourceText.includes('Continue with Google')
    || !sourceText.includes('Confirm password')
  ) {
    throw new Error('The source login/signup interface does not contain the expected React auth content.');
  }

  const sourceStyle = styleFiles.find((filePath) => path.basename(filePath, '.scss') === 'login');
  const compiledStyle = path.join(outputDirectory, 'styles', 'login.css');

  if (!sourceStyle || !fs.existsSync(compiledStyle)) {
    throw new Error('The source login stylesheet was not compiled.');
  }

  const iconPath = path.join(projectRoot, 'icons', 'icon.png');

  if (!fs.existsSync(iconPath)) {
    throw new Error('The source SeriesMingle login logo was not found.');
  }

  const iconDestination = path.join(projectRoot, 'public', 'react-mapped', 'assets', 'icons', 'icon.png');
  const styleDestination = path.join(projectRoot, 'public', 'react-mapped', 'styles', 'login.css');
  const loginViewPath = path.join(projectRoot, 'resources', 'views', 'auth', 'login.blade.php');
  const registerViewPath = path.join(projectRoot, 'resources', 'views', 'auth', 'register.blade.php');
  const errorMessage = `@if(session('error') || $errors->any())
                <p class="error-message">{{ session('error') ?? $errors->first() }}</p>
            @endif`;
  const googleButton = `<a href="{{ route('auth.google') }}" class="google-sign-in">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0//images/auth/google.svg" alt="Google logo">
                <span>Continue with Google</span>
            </a>`;
  const shell = (mode) => {
    const isRegister = mode === 'register';
    const action = isRegister ? 'register' : 'login';
    const pageTitle = isRegister ? 'Create Account' : 'Sign In';
    const submitText = pageTitle;
    const fields = [
      '<input type="email" id="email" name="email" placeholder="Email" value="{{ old(\'email\') }}" required autocomplete="email" autofocus>',
      `<input type="password" id="password" name="password" placeholder="Password" maxlength="30" required autocomplete="${isRegister ? 'new-password' : 'current-password'}">`,
      ...(isRegister
        ? ['<input type="password" id="password_confirmation" name="password_confirmation" placeholder="Confirm password" maxlength="30" required autocomplete="new-password">']
        : []),
    ].join('\n                ');
    const footer = isRegister
      ? `Already have an account? <a href="{{ route('login') }}">Sign In</a>`
      : `Don't have an account? <a href="{{ route('register') }}">Create Account</a>`;

    return `<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${pageTitle} | SeriesMingle</title>
    <link rel="stylesheet" href="{{ asset('react-mapped/styles/app.css') }}">
    <link rel="stylesheet" href="{{ asset('react-mapped/styles/theme.css') }}">
    <link rel="stylesheet" href="{{ asset('react-mapped/styles/login.css') }}">
    @vite(['resources/js/app.js'])
</head>
<body>
    <div id="app">
        <div id="login">
            <main>
                <img src="{{ asset('react-mapped/assets/icons/icon.png') }}" alt="Series Mingle logo" id="logo">
                <h1><span>Series</span><span>Mingle</span></h1>
                <form method="POST" action="{{ route('${action}') }}">
                    @csrf
                    <fieldset id="login-form">
                        <legend><h2>${pageTitle}</h2></legend>
                        ${fields}
                        ${errorMessage}
                        <button id="submit" type="submit" value="Submit"><h3>${submitText}</h3></button>
                        <div class="separator">
                            <hr class="line">
                            <span class="text">or</span>
                            <hr class="line">
                        </div>
                        ${googleButton}
                    </fieldset>
                </form>
                <span>${footer}</span>
            </main>
        </div>
    </div>
</body>
</html>
`;
  };

  fs.mkdirSync(path.dirname(iconDestination), { recursive: true });
  fs.mkdirSync(path.dirname(styleDestination), { recursive: true });
  fs.mkdirSync(path.dirname(loginViewPath), { recursive: true });
  fs.copyFileSync(iconPath, iconDestination);
  fs.copyFileSync(compiledStyle, styleDestination);
  fs.writeFileSync(loginViewPath, shell('login'));
  fs.writeFileSync(registerViewPath, shell('register'));

  return {
    views: [
      portablePath(path.relative(projectRoot, loginViewPath)),
      portablePath(path.relative(projectRoot, registerViewPath)),
    ],
    styles: [{
      source: portablePath(path.relative(sourceRoot, sourceStyle)),
      compiled: 'styles/login.css',
      destination: portablePath(path.relative(projectRoot, styleDestination)),
    }],
    assets: ['icons/icon.png'],
    source: 'components/Login.tsx',
  };
}

function main() {
  const args = readArguments(process.argv.slice(2));
  const projectRoot = path.resolve(args.root ?? process.cwd());
  const sourceRoot = path.resolve(projectRoot, args.source ?? 'client');
  const componentsDirectory = path.join(sourceRoot, 'components');
  const stylesDirectory = path.join(sourceRoot, 'styles');
  const outputDirectory = path.resolve(projectRoot, args.output ?? 'storage/app/react-to-blade');

  if (!fs.existsSync(componentsDirectory)) {
    throw new Error(`Components directory not found: ${componentsDirectory}`);
  }

  const componentFiles = fs.readdirSync(componentsDirectory)
    .filter((fileName) => fileName.endsWith('.tsx'))
    .sort()
    .map((fileName) => path.join(componentsDirectory, fileName));
  const styleFiles = readStyleFiles(stylesDirectory);
  const {
    tokens: colorTokens,
    conflicts: conflictingColorTokens,
    sources: colorTokenSources,
  } = collectStyleTokens(styleFiles, sourceRoot);

  fs.mkdirSync(path.join(outputDirectory, 'templates'), { recursive: true });
  fs.mkdirSync(path.join(outputDirectory, 'styles'), { recursive: true });

  const components = [];

  for (const filePath of componentFiles) {
    const fileName = path.basename(filePath);
    const componentName = path.basename(fileName, '.tsx');
    const source = fs.readFileSync(filePath, 'utf8');
    const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const parseIssues = sourceFile.parseDiagnostics.map((diagnostic) => ({
      type: 'tsx_parse_error',
      line: sourceFile.getLineAndCharacterOfPosition(diagnostic.start ?? 0).line + 1,
      message: ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'),
    }));

    const routerLinkAliases = new Set();

    for (const statement of sourceFile.statements) {
      if (!ts.isImportDeclaration(statement) || statement.moduleSpecifier.text !== 'react-router-dom') {
        continue;
      }

      if (statement.importClause?.namedBindings && ts.isNamedImports(statement.importClause.namedBindings)) {
        for (const element of statement.importClause.namedBindings.elements) {
          if (['Link', 'NavLink'].includes(element.name.text)) {
            routerLinkAliases.add(element.name.text);
          } else if (['Link', 'NavLink'].includes(element.propertyName?.text)) {
            routerLinkAliases.add(element.name.text);
          }
        }
      }
    }

    if (parseIssues.length > 0) {
      components.push({
        name: componentName,
        source: portablePath(path.relative(sourceRoot, filePath)),
        status: 'unsupported',
        issues: parseIssues,
      });
      continue;
    }

    const mapped = mapperFor(
      sourceFile,
      componentName,
      routerLinkAliases,
      colorTokens,
    );
    const templateName = `${kebabCase(componentName)}.blade.php`;

    if (mapped.template !== null) {
      fs.writeFileSync(path.join(outputDirectory, 'templates', templateName), mapped.template);
    }

    components.push({
      name: componentName,
      source: portablePath(path.relative(sourceRoot, filePath)),
      ...(mapped.template !== null ? { template: `templates/${templateName}` } : {}),
      status: mapped.issues.length === 0 ? 'mapped' : mapped.template ? 'partial' : 'unsupported',
      issues: mapped.issues,
    });
  }

  const styles = styleFiles.map((filePath) => {
    const warnings = [];
    const css = sass.compile(filePath, {
      style: 'expanded',
      logger: {
        warn(message) {
          warnings.push(message);
        },
      },
    });
    const compiledPath = `styles/${path.basename(filePath, '.scss')}.css`;

    fs.writeFileSync(path.join(outputDirectory, compiledPath), css.css);

    return {
      source: portablePath(path.relative(sourceRoot, filePath)),
      compiled: compiledPath,
      status: 'compiled_reference',
      warningCount: warnings.length,
      warnings,
      reason: 'Original SCSS was compiled without rewriting its selectors or behavior. Use this reference to migrate rules into Tailwind and the Laravel markup.',
    };
  });
  const applied = args.apply
    ? {
      ...applySourceHomePage(projectRoot, sourceRoot, outputDirectory, styleFiles),
      navigation: applySourceAuthenticatedNavigation(projectRoot, sourceRoot),
      dashboard: applySourceDashboard(projectRoot, sourceRoot, outputDirectory, styleFiles),
      projectPage: applySourceProjectStyles(projectRoot, sourceRoot, outputDirectory, styleFiles),
      auth: applySourceAuthPages(projectRoot, sourceRoot, outputDirectory, styleFiles),
    }
    : null;
  const reportedStyles = styles.map((style) => {
    if (!applied || ![
      'styles/app.css',
      'styles/home.css',
      'styles/dash.css',
      'styles/project.css',
      'styles/login.css',
    ].includes(style.compiled)) {
      return style;
    }

    return {
      ...style,
      status: 'applied',
      appliedTo: style.compiled === 'styles/dash.css'
        ? 'dashboard'
        : style.compiled === 'styles/project.css'
          ? 'project page'
          : style.compiled === 'styles/login.css'
            ? 'login and signup'
          : 'homepage and authenticated pages',
      reason: 'The original compiled stylesheet is installed and linked to the matching Laravel page.',
    };
  });

  const report = {
    mapperVersion: 5,
    source: portablePath(path.relative(projectRoot, sourceRoot)),
    generatedTemplatesDirectory: 'templates',
    tailwindThemeCss: 'tailwind-colors.css',
    applied,
    components,
    styles: reportedStyles,
    tailwindColors: colorTokens,
    colorTokenSources,
    conflictingColorTokens,
    deferred: [
      {
        source: 'functions/generateSchedule.ts',
        reason: 'Schedule generation is intentionally deferred; no scheduler behavior is translated by this mapper.',
      },
    ],
  };

  fs.writeFileSync(
    path.join(outputDirectory, 'tailwind-colors.json'),
    `${JSON.stringify(colorTokens, null, 2)}\n`,
  );
  const tailwindTheme = Object.entries(colorTokens)
    .map(([name, value]) => `  --color-${kebabCase(name)}: ${value};`)
    .join('\n');
  const tailwindThemeCss = `@theme {\n${tailwindTheme}\n}\n`;

  fs.writeFileSync(path.join(outputDirectory, 'tailwind-colors.css'), tailwindThemeCss);
  fs.writeFileSync(path.join(outputDirectory, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);

  const componentsRequiringManualMigration = components.filter((component) => component.status !== 'mapped').length;
  const styleFilesRequiringManualMigration = reportedStyles.filter((style) => (
    !['mapped', 'applied'].includes(style.status)
  )).length;

  process.stdout.write(`${JSON.stringify({
    componentCount: components.length,
    colorTokenCount: Object.keys(colorTokens).length,
    componentsRequiringManualMigration,
    styleFilesRequiringManualMigration,
    appliedFileCount: applied
      ? 1
        + applied.styles.length
        + applied.assets.length
        + (applied.navigation ? applied.navigation.views.length + 1 : 0)
        + (applied.dashboard ? 1 + applied.dashboard.styles.length : 0)
        + (applied.projectPage ? 1 + applied.projectPage.styles.length : 0)
        + (applied.auth ? applied.auth.views.length + applied.auth.styles.length : 0)
      : 0,
    outputDirectory,
  })}\n`);
}

try {
  main();
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
