// Generate colors between the ranges of 'hwb(1 0% 25%)' and 'hwb(360 0% 25%)'
// There will be 'n' colors picked from the spectrum, 'n' will always be a relatively small positive non-zero integer
// These colors will be optimally picked as that the contrast between any color and it's successor are equal and span the entire spectrum i.e. the last color has that same contrast with the first color.
// We also have some colors excluded, as they clash with the background color
// Right now this is hard coded as excluding the hues within the range 210 - 290
// We will assume we already have 'n' and 'n' equally spread hues (by number, i.e. 10 different, not spread by even contrast, this will be the baseline)
const logging = false

function maximizeSpread(array) {
  const n = array.length;
  const numGroups = Math.ceil(Math.sqrt(n));

  // Sort the array using a custom comparator based on modulus
  const spreadArray = array.slice().sort((a, b) => {
      return (array.indexOf(a) % numGroups) - (array.indexOf(b) % numGroups);
  });

  return spreadArray;
}

export default function generateColors(n) {
  const hues = Array(n)
    .fill(null)
    .map((_, i) => (((i * (280 / n)) % 280) + 290) % 360)

  // Check if 'n' is valid, if not the return nothing, and if 'n' is 1 or 2 then return the initial hues
  if ([1, 2].includes(n)) return hues
  else if (typeof n !== 'number' || Math.round(n) !== n || n <= 0) return

  let measure = Infinity
  let newHues = hues
  let iteration = 0
  const limit = 0
  let bestSet = hues
  let bestMin = 0

  while (iteration < limit) {
    iteration++

    // To solve this problem, we must first find the contrast between each hue in the list
    const contrasts = newHues.map((hue, i) =>
      getContrast(hue, hues[(i + 1) % (hues.length - 1)]),
    )

    // Right now, we will only log these values and then return the initial hues
    if (logging) console.log(JSON.stringify(contrasts, null, 2))

    // The difference between the average and it's furthest point (will be either the min or max) is the measure
    const average = contrasts.reduce((a, b) => a + b, 0) / contrasts.length
    const min = Math.min(...contrasts)
    const max = Math.max(...contrasts)
    measure = Math.max(Math.abs(average - min), Math.abs(average - max))
    if (logging) console.log(measure)

    // If this measure is less than the current best, and it's average is higher, then update it
    if (min > bestMin) {
      bestMin = min
      bestSet = newHues
    }

    // Pick new hues, where each hue becomes a new value between it's neighbours, such that it makes it's old contrasts even
    newHues = Array(n)
      .fill(null)
      .map((_, i) => {
        // return (((i * (280 / n)) % 280) + 290) % 360
        // ^ That was the original one, now using the contrast between it's pairs, it can figure where it needs to go in relation to 'n - 1' and 'n + 1'
        // So, will become 'n +/- some modifier between -0.999999... and 0.9999999...'
        const nextHue = newHues[(i + 1) % (newHues.length - 1)]
        const prevHue = newHues[(i - 1 + newHues.length) % (newHues.length - 1)]
        const nextContrast = contrasts[i]
        const prevContrast =
          contrasts[(i + newHues.length - 2) % (newHues.length - 1)]
        let modifier = (nextContrast - prevContrast) / (nextHue - prevHue)
        // If any of it's hue span goes through the 210 to 290 void, then compensate the modifier by scaling it down
        // I.e. if anything between 210 and 290 are within the bounds of the neighbours
        // The scale will decrease depending how much of that range is in between
        if (prevHue <= 210 && 290 >= nextHue) {
          // Get the num of overlap, getting the difference between the start and end of overlap
          const overlap = Math.min(nextHue, 290) - Math.max(prevHue, 210)
          // Scale the modifier down by ratio of overlap area to the rest of the neighbour difference
          modifier *= 1 - overlap / (nextHue - prevHue)
        }

        return (((i * (280 / (n + modifier))) % 280) + 290) % 360
      })
  }

  if (logging) console.log('BEST:')
  const contrasts = bestSet.map((hue, i) =>
    getContrast(hue, hues[(i + 1) % (hues.length - 1)]),
  )

  // Right now, we will only log these values and then return the initial hues
  if (logging) console.log(JSON.stringify(contrasts, null, 2))
  return maximizeSpread(bestSet)
}

function makeColor(hue) {
  // Convert 'hwb(hue 0% 25%)' to the rgb values for each color

  const output = {}

  function f(n) {
    const k = (n + hue / 30) % 12
    return 0.5 - 0.5 * Math.max(-1, Math.min(k - 3, 9 - k, 1))
  }

  const rgb = { r: f(0), g: f(8), b: f(4) }

  ;['r', 'g', 'b'].forEach((channel) => {
    output[channel] = rgb[channel] * 0.75
  })
  return output
}

function getContrast(hue1, hue2) {
  // Find the contrast between the two colors

  // Turn each hue into an rgb object
  const color1 = makeColor(hue1)
  const color2 = makeColor(hue2)

  if (logging) console.log(color1)

  function luminance(r, g, b) {
    const a = [r, g, b].map((v) =>
      v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4),
    )
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
  }

  const lum1 = luminance(...Object.values(color1))
  const lum2 = luminance(...Object.values(color2))
  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)
  return (brightest + 0.05) / (darkest + 0.05)
}
