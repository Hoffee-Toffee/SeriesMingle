
      {isPageLoaded && (hasAccess ? (
        <main class='fadein'>
          <div id='removeWatchedPopup'>
            <div>
              <p>Are you sure you want to remove all completed content?</p>
              <strong>This action cannot be undone.</strong>
              <button wire:click="{
                removeWatched()
                document.getElementById('removeWatchedPopup')?.classList.remove('show');
              "}>Remove Completed</button>
              <button wire:click="document.getElementById('removeWatchedPopup')?.classList.remove('show')">Cancel</button>
            </div>
          </div>
          <div id='clearSchedulePopup'>
            <div>
              <p>Are you sure you want to remove all layers?</p>
              <strong>This action cannot be undone.</strong>
              <button wire:click="{
                // Old state with default layers, data, and titles
                setState({ ...state, layers: initialState.layers, data: initialState.data, titles: initialState.titles, force: true ")
                setChangedProps([...changedProps, 'layers', 'data', 'titles'])
                document.getElementById('clearSchedulePopup')?.classList.remove('show')
              }}>
                Clear Schedule
              </button>
              <button wire:click="document.getElementById('clearSchedulePopup')?.classList.remove('show')">Cancel</button>
            </div>
          </div>
          <div id='rippleActionPopup'>
            <div>
              <p>Remove completed content to perform this action?</p>
              <strong>This action cannot be undone.</strong>
              <button wire:click="{
                removeWatched()
                document.getElementById('rippleActionPopup')?.classList.remove('show')
              "}>Remove Completed</button>
              <button wire:click="{
                document.getElementById('rippleActionPopup')?.classList.remove('show')
              "}>Cancel</button>
            </div>
          </div>
          <Terminal
            keys={keys}
            setKeys={setKeys}
          />
          {scheduleData.schedule.length > 0 && (
            <button
              wire:click="navigator.share({
                  title: 'My Watching Schedule',
                  text: 'Check out my watching schedule on SeriesMingle!',
                  url: `${window.location.origin"${window.location.pathname}`,
                })
              }
            >
              Share Schedule
            </button>
          )}
          {scheduleData.schedule.length == 0 && (
            <button
              wire:click="{
                if (readOnly) return
                setState(example)
                setChangedProps(Object.keys(example))
              "}
            >
              Load Example
            </button>
          )}
          {readOnly && (
            <span
              style={{ color: 'white', display: 'block', textAlign: 'center' }}
            >
              READ-ONLY
            </span>
          )}
          <div id="project-details">
            <h2 class="setTitle showTitle" contentEditable suppressContentEditableWarning={true}
              onBlur={(e) => {
                if (!e.target.innerText.trim()) e.target.innerText = title
                else setTitle(e.target.innerText)
              }}>{title}</h2>
            <span class="setDescription" contentEditable suppressContentEditableWarning={true}
              onBlur={(e) => {
                if (!e.target.innerText.trim()) e.target.innerText = description
                else setDescription(e.target.innerText)
              }}>{description}</span></div>
          <fieldset id="layerContainer">
            {/* open if a bookmark does not exist */}
            <details open={!bookmark}>
              <summary ref={summaryRefs[0]}>
                <legend>Layers</legend></summary>
              <DndContext
                sensors={sensors}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
              >
                <SortableContext
                  items={shown.flatMap((layer, li) =>
                    layer.map((_, ei) => ({ id: `${li}-${ei}` })),
                  )}
                >
                  {shown.map((entries, index) => (
                    <Layer
                      key={index}
                      id={index}
                      entries={entries}
                      layers={shown}
                      setLayers={setLayers}
                      data={data}
                      addData={addData}
                      outlinePos={outlinePos}
                      setCustom={setCustom}
                      titles={titles}
                      setTitles={setTitles}
                      setShow={setShow}
                      setMovie={setMovie}
                      setBook={setBook}
                      runAfterConfirm={runAfterConfirm}
                      bookmark={bookmark}
                    />
                  ))}
                </SortableContext>
                <button wire:click="runAfterConfirm(() => setLayers([...layers, []]))">
                  New Layer
                </button>
                <DragOverlay dropAnimation={null}>
                  {activeEntry && (
                    <Entry
                      entry={activeEntry}
                      data={data}
                      class="overlay"
                    />
                  )}
                </DragOverlay>
              </DndContext>
            </details>
          </fieldset>
          {/* Collapsible set (summary and details) */}
          {scheduleData.schedule.length > 0 &&
            <fieldset id='settings'>
              <details>
                <summary ref={summaryRefs[1]}>
                  <legend>
                    Settings
                  </legend>
                </summary>
                <fieldset id="mp" wire:model="(e) => runAfterConfirm(() => setMpSpacing(e.target.value))">
                  <legend>Space Multi-Parters
                  </legend>
                  {['Normally', 'Closer', 'Consecutively'].map((option, i) => (
                    <div key={i}>
                      <input
                        type="radio"
                        name={`mp-opt-${i}`}
                        value={option.toLowerCase().slice(0, 6)}
                        checked={mpSpacing === option.toLowerCase().slice(0, 6)}
                      />
                      <label htmlFor={`mp-opt-${i}`}>{option}</label>
                    </div>
                  ))}
                    <br />
                    <span>
                      {
                        ({
                          normal: "Normal",
                          closer: "Less",
                          consec: "No"
                        }[mpSpacing]) + " spacing between episode parts and arcs"
                      }
                    </span>
                </fieldset>
                <fieldset id="streak">
                  <legend>Average Streak Duration (hours)
                  </legend>
                  <input
                    type="number"
                    min="0"
                    max="25"
                    step="0.25"
                    value={streak}
                    wire:model="(e) => runAfterConfirm(() => setStreak(Math.max(parseFloat(e.target.value), 0)))"
                  />
                </fieldset>
                <fieldset id="goal">
                  <legend>Average {streak !== 0 ? "# of Streaks per" : "duration of each"} Watch Session</legend>

                    <input
                      type="number"
                      min="0"
                      max="25"
                      step={streak !== 0 ? "1" : "0.25"}
                      value={goal}
                      wire:model="(e) => runAfterConfirm(() => setGoal(Math.max(parseInt(e.target.value), 0)))"
                    />
                    {goal !== 0 ? streak !== 0 ?
                      <br />
                      <br />
                      <span>Making ~{Math.round([...new Set(scheduleData.schedule.map(e => e.mid))].length / goal) + 1} watch sessions</span>
                      <br />
                      <span>Each with an average length of {Math.round((scheduleData.totalSpan / ([...new Set(scheduleData.schedule.map(e => e.mid))].length / goal) + 1) / 6) / 10} hours</span>
                     :
                      <br />
                      <br />
                      <span>Making {Math.round(scheduleData.totalSpan / (goal * 60))} watch sessions</span>

                      : null}

                </fieldset>
                {streak !== 0 && goal !== 0 ? (
                  <fieldset id="sessionOptions">
                    <legend>Watch Session Options
                    </legend>

                      <fieldset id="showStreaks">
                        <legend>Show Streaks
                        </legend>
                        <input
                          type="checkbox"
                          checked={showStreaks}
                          wire:model="(e) => runAfterConfirm(() => setShowStreaks(e.target.checked))"
                        />
                      </fieldset>
                      <fieldset id="groupStreaks">
                        <legend>Group Streaks
                        </legend>
                        <input
                          type="checkbox"
                          checked={groupStreaks}
                          wire:model="(e) => runAfterConfirm(() => setGroupStreaks(e.target.checked))"
                        />
                      </fieldset>

                  </fieldset>
                ) : null}
              </details></fieldset >
            <fieldset id='stats'>
              <details>
                <summary ref={summaryRefs[2]}>
                  <legend>
                    Statistics
                  </legend>
                </summary>
                {/* Percentage of schedule completed */}
                {/* Percentage of layer / show / set completed, as well as time remaining / passed (2 decimal places)*/}
                {/* Entire schedule time remaining / passed */}
                {/* Finish estimate (comparing start date to current date and percentage watched over that time) */}
                <fieldset>
                  <legend>Progress</legend>
                  <span>
                    {/* 1 hour and 3 minutes watched (25%) out of 4 hours and 12 minutes. */}
                    {Math.floor(scheduleData.seenSpan / 60) ?

                        <span class="yellow">
                          {`${Math.floor(scheduleData.seenSpan / 60)}`}
                        </span>
                        {scheduleData.seenSpan / 60 > 1 ? ' hours ' : ' hour '}

                      : ''
                    }
                    {Math.floor(scheduleData.seenSpan / 60) && scheduleData.seenSpan % 60 ? 'and ' : ''}
                    {scheduleData.seenSpan % 60 ?

                        <span class="yellow">
                          {`${scheduleData.seenSpan % 60}`}
                        </span>
                        {scheduleData.seenSpan % 60 > 1 ? ' minutes ' : ' minute '}

                      : ''
                    }
                    completed ({Math.round(scheduleData.seenSpan / scheduleData.totalSpan * 10000) / 100}%) out of {scheduleData.totalSpan ?
                      {Math.floor(scheduleData.totalSpan / 60) ?

                          <span class="yellow">
                            {`${Math.floor(scheduleData.totalSpan / 60)}`}
                          </span>
                          {scheduleData.totalSpan / 60 > 1 ? ' hours' : ' hour'}

                        : ''
                      }
                      {Math.floor(scheduleData.totalSpan / 60) && scheduleData.totalSpan % 60 ? ' and ' : ''}
                      {scheduleData.totalSpan % 60 ?

                          <span class="yellow">
                            {`${scheduleData.totalSpan % 60}`}
                          </span>
                          {scheduleData.totalSpan % 60 > 1 ? ' minutes' : ' minute'}

                        : ''
                      }
                     : '0 minutes'}.
                  </span>
                </fieldset>
              </details>
            </fieldset>
            <Schedule scheduleData={scheduleData} user={user} />

          }
        </main >
      )
        : <p>No Access</p>)
      }
