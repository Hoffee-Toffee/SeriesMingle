export default function Example({ id }) {
  return <div id="project" className="bg">
    <div id="timelineContainer" data-id={id}>
      <div id="scheduleVisualization">
        <div
          className="episode-marker premier odd"
          data-id="tv/1408/1/1"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 125,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 57px)"
              }}
            >
              <label htmlFor="bookmark-0">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-0" />
              <span>House (S1E1)</span>
              <span className="title">Pilot</span>
              <span className="spoiler">
                Dr. Gregory House, a brilliant diagnostician but devoid of bedside
                manner, and his elite team of young medical experts rush to save
                the life of a kindergarten teacher who started speaking gibberish
                and passed out in front of her class.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker premier"
          data-id="tv/1396/1/1"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 59px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 63,
              maxHeight: 124,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 47,
                maxHeight: "calc(var(--scale) * 54px + var(--height-mult) * 41px)"
              }}
            >
              <label htmlFor="bookmark-1">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-1" />
              <span>Breaking Bad (S1E1)</span>
              <span className="title">Pilot</span>
              <span className="spoiler">
                When an unassuming high school chemistry teacher discovers he has
                a rare form of lung cancer, he decides to team up with a former
                student and create a top of the line crystal meth in a used RV, to
                provide for his family once he is gone.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/1/2"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 43px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 47,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 31,
                maxHeight: "calc(var(--scale) * 38px + var(--height-mult) * 47px)"
              }}
            >
              <label htmlFor="bookmark-2">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-2" />
              <span>House (S1E2)</span>
              <span className="title">Paternity</span>
              <span className="spoiler">
                Dr. House goes with his gut and performs an unethical act to prove
                what he suspects to be the link to a teenage lacrosse player's
                illness in order to save the boy's life.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/1/2"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 49px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 53,
              maxHeight: 115,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 37,
                maxHeight: "calc(var(--scale) * 44px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-3">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-3" />
              <span>Breaking Bad (S1E2)</span>
              <span className="title">Cat's in the Bag...</span>
              <span className="spoiler">
                Walt and Jesse attempt to tie up loose ends. The desperate
                situation gets more complicated with the flip of a coin. Walt's
                wife, Skyler, becomes suspicious of Walt's strange behavior.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/1/3"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-4">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-4" />
              <span>House (S1E3)</span>
              <span className="title">Occam's Razor</span>
              <span className="spoiler">
                Dr. House and his team race to save a young man who may have not
                one, but two illnesses killing him.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/1/4"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 115,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 47px)"
              }}
            >
              <label htmlFor="bookmark-5">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-5" />
              <span>House (S1E4)</span>
              <span className="title">Maternity</span>
              <span className="spoiler">
                A maternity ward epidemic forces House to decide whether to save
                the life of one child over another.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/1/3"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 49px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 53,
              maxHeight: 115,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 37,
                maxHeight: "calc(var(--scale) * 44px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-6">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-6" />
              <span>Breaking Bad (S1E3)</span>
              <span className="title">...And the Bag's in the River</span>
              <span className="spoiler">
                Walter fights with Jesse over his drug use, causing him to leave
                Walter alone with their captive, Krazy-8. Meanwhile, Hank has a
                scared straight moment with Walter Jr. after his aunt discovers he
                has been smoking pot. Also, Skylar is upset when Walter stays away
                from home.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/1/5"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 115,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 47px)"
              }}
            >
              <label htmlFor="bookmark-7">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-7" />
              <span>House (S1E5)</span>
              <span className="title">Damned If You Do</span>
              <span className="spoiler">
                Dr. House's approach is questioned when he treats a nun for what
                he believes to be an allergy, not realizing the nun's past is
                coming back to haunt her.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/1/4"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 49px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 53,
              maxHeight: 115,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 37,
                maxHeight: "calc(var(--scale) * 44px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-8">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-8" />
              <span>Breaking Bad (S1E4)</span>
              <span className="title">Cancer Man</span>
              <span className="spoiler">
                Walter finally tells his family that he has been stricken with
                cancer. Meanwhile, the DEA believes Albuquerque has a new, big
                time player to worry about. Meanwhile, a worthy recipient is the
                target of a depressed Walter's anger, and Jesse makes a surprise
                visit to his parents home.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/1/6"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-9">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-9" />
              <span>House (S1E6)</span>
              <span className="title">The Socratic Method</span>
              <span className="spoiler">
                The case of a schizophrenic mom with a deadly disease and her
                teenage son who have traded caretaking roles holds a special
                interest for Dr. House.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/1/7"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 115,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 47px)"
              }}
            >
              <label htmlFor="bookmark-10">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-10" />
              <span>House (S1E7)</span>
              <span className="title">Fidelity</span>
              <span className="spoiler">
                Dr. House's diagnosis of a married woman with a rare sleep
                disorder forces her and her husband to examine their marriage and
                question their trust for each other.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/1/5"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 49px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 53,
              maxHeight: 115,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 37,
                maxHeight: "calc(var(--scale) * 44px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-11">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-11" />
              <span>Breaking Bad (S1E5)</span>
              <span className="title">Gray Matter</span>
              <span className="spoiler">
                Walter and Skyler attend a former colleague's party. Jesse tries
                to free himself from the drugs, while Skyler organizes an
                intervention.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/1/8"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 115,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 47px)"
              }}
            >
              <label htmlFor="bookmark-12">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-12" />
              <span>House (S1E8)</span>
              <span className="title">Poison</span>
              <span className="spoiler">
                House and his team have to act fast when a high school student is
                admitted with a mysterious and lethal poisoning, especially when
                they discover more teens have been diagnosed with the same deadly
                illness.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/1/6"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 49px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 53,
              maxHeight: 115,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 37,
                maxHeight: "calc(var(--scale) * 44px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-13">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-13" />
              <span>Breaking Bad (S1E6)</span>
              <span className="title">Crazy Handful of Nothin'</span>
              <span className="spoiler">
                The side effects of chemo begin to plague Walt. Meanwhile, the DEA
                rounds up suspected dealers.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/1/9"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-14">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-14" />
              <span>House (S1E9)</span>
              <span className="title">DNR</span>
              <span className="spoiler">
                House has to defend himself when he treats a patient who has
                legally chosen to refuse treatment.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker finale"
          data-id="tv/1396/1/7"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-15">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-15" />
              <span>Breaking Bad (S1E7)</span>
              <span className="title">A No Rough Stuff Type Deal</span>
              <span className="spoiler">
                Walter accepts his new identity as a drug dealer after a PTA
                meeting. Elsewhere, Jesse decides to put his aunt's house on the
                market and Skyler is the recipient of a baby shower.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/1/10"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-16">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-16" />
              <span>House (S1E10)</span>
              <span className="title">Histories</span>
              <span className="spoiler">
                Dr. House and the team treat a homeless woman whose worsening
                symptoms and unknown identity prove to be a complex mystery.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/1/11"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-17">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-17" />
              <span>House (S1E11)</span>
              <span className="title">Detox</span>
              <span className="spoiler">
                Dr. House takes Cuddy's challenge to go off his painkillers for a
                week, but the effects of his withdrawal symptoms may put his
                patient in danger.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker premier"
          data-id="tv/1396/2/1"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 52,
              maxHeight: 113,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 41px)"
              }}
            >
              <label htmlFor="bookmark-18">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-18" />
              <span>Breaking Bad (S2E1)</span>
              <span className="title">Seven Thirty-Seven</span>
              <span className="spoiler">
                Walt and Jesse are vividly reminded of Tuco’s volatile nature, and
                try to figure a way out of their business partnership. Hank
                attempts to mend fences between the estranged Marie and Skyler.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/1/12"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 43px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 47,
              maxHeight: 113,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 31,
                maxHeight: "calc(var(--scale) * 38px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-19">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-19" />
              <span>House (S1E12)</span>
              <span className="title">Sports Medicine</span>
              <span className="spoiler">
                A baseball player's comeback is cut short when he breaks his arm
                and House and his team have to act fast to figure out what is
                causing major bone loss that's killing the player and his dreams.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/2/2"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-20">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-20" />
              <span>Breaking Bad (S2E2)</span>
              <span className="title">Grilled</span>
              <span className="spoiler">
                Walt and Jesse find themselves in close quarters with an unhinged
                Tuco. Marie and Hank comfort Skyler, who is distraught over Walt’s
                disappearance. Hank pays a visit to Mrs. Pinkman on some
                not-so-official business.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/1/13"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 113,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 45px)"
              }}
            >
              <label htmlFor="bookmark-21">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-21" />
              <span>House (S1E13)</span>
              <span className="title">Cursed</span>
              <span className="spoiler">
                Dr. House's young patient believes his illness is the result of a
                curse while House uncovers important information about Chase's
                father.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/2/3"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 47px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 51,
              maxHeight: 113,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 35,
                maxHeight: "calc(var(--scale) * 42px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-22">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-22" />
              <span>Breaking Bad (S2E3)</span>
              <span className="title">Bit by a Dead Bee</span>
              <span className="spoiler">
                Walt and Jesse become short on cash when they try to cover their
                tracks. Meanwhile, the DEA has a lead that could them straight to
                Walt and Jesse.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/1/14"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-23">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-23" />
              <span>House (S1E14)</span>
              <span className="title">Control</span>
              <span className="spoiler">
                The hospital's new Chairman of the Board has it out for Dr. House,
                questioning his importance to the hospital and threatening to
                eliminate House and his team.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/1/15"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-24">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-24" />
              <span>House (S1E15)</span>
              <span className="title">Mob Rules</span>
              <span className="spoiler">
                Dr. House and his team race to diagnose a member of the mob and
                get him well enough to testify and enter the witness protection
                program while Cuddy works to convince Vogler of House's importance
                to the hospital.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/2/4"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-25">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-25" />
              <span>Breaking Bad (S2E4)</span>
              <span className="title">Down</span>
              <span className="spoiler">
                Walt attempts to reconnect with his family, while Jesse struggles
                to rebuild his life.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/1/16"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-26">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-26" />
              <span>House (S1E16)</span>
              <span className="title">Heavy</span>
              <span className="spoiler">
                Dr. House and his team try to uncover the reason a 10-year-old has
                a heart attack while House suspects one of his team is selling him
                out to Vogler.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/2/5"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-27">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-27" />
              <span>Breaking Bad (S2E5)</span>
              <span className="title">Breakage</span>
              <span className="spoiler">
                Hank suffers from the aftermath of his encounter with Tuco.
                Meanwhile, Jesse hires a crew to get their product out on the
                streets.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/1/17"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-28">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-28" />
              <span>House (S1E17)</span>
              <span className="title">Role Model</span>
              <span className="spoiler">
                House and his team battle to save a presidential hopeful, and
                House refuses to give in to Vogler's ultimatum when given the
                chance to save one of his team members.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/2/6"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-29">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-29" />
              <span>Breaking Bad (S2E6)</span>
              <span className="title">Peekaboo</span>
              <span className="spoiler">
                Walt's secret is in jeopardy when Skyler thanks Gretchen for
                paying for his treatment.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/1/18"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-30">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-30" />
              <span>House (S1E18)</span>
              <span className="title">Babies &amp; Bathwater</span>
              <span className="spoiler">
                House and his team battle to diagnose a pregnant patient's
                life-threatening illness, prompting her to make the most emotional
                decision of her life, and Vogler is determined to fire House.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/1/19"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-31">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-31" />
              <span>House (S1E19)</span>
              <span className="title">Kids</span>
              <span className="spoiler">
                House and his team race to diagnose a 12-year-old's illness - an
                illness with a shocking origin - and House asks Cameron to come
                back to her job.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/2/7"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-32">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-32" />
              <span>Breaking Bad (S2E7)</span>
              <span className="title">Negro y Azul</span>
              <span className="spoiler">
                Jesse and Walt discuss expanding into new territories; Hank
                struggles to fit in; Skyler pursues a new job opportunity; Jesse
                gets to know his landlord.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/1/20"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-33">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-33" />
              <span>House (S1E20)</span>
              <span className="title">Love Hurts</span>
              <span className="spoiler">
                House and his team tackle the case of a young man with a penchant
                for odd behavior, and House prepares for his date with Cameron.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/2/8"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-34">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-34" />
              <span>Breaking Bad (S2E8)</span>
              <span className="title">Better Call Saul</span>
              <span className="spoiler">
                Walt and Jesse seek advice from a shady attorney when Badger gets
                in trouble with the law; the DEA believes they have caught up with
                "Heisenberg" ; Hank returns.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/1/21"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-35">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-35" />
              <span>House (S1E21)</span>
              <span className="title">Three Stories</span>
              <span className="spoiler">
                House must decide whether to take the case of his ex-love's
                husband and he gives medical students a lecture they'll never
                forget.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/2/9"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-36">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-36" />
              <span>Breaking Bad (S2E9)</span>
              <span className="title">4 Days Out</span>
              <span className="spoiler">
                Walt and his family wait for news after he undergoes a PET-CT
                scan. Walt follows Saul's advice; Jesse's relationship with Jane
                is put on hold when he and Walt head to the desert for a marathon
                of cooking.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker finale odd"
          data-id="tv/1408/1/22"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-37">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-37" />
              <span>House (S1E22)</span>
              <span className="title">Honeymoon</span>
              <span className="spoiler">
                House is faced with a problem he may not be able to solve and
                Stacy returns.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker premier odd"
          data-id="tv/1408/2/1"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-38">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-38" />
              <span>House (S2E1)</span>
              <span className="title">Acceptance</span>
              <span className="spoiler">
                When a Death Row inmate mysteriously and suddenly collapses after
                hallucinating, House jumps at the chance to take the case for its
                difficulty and because it's "cool."
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/2/10"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-39">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-39" />
              <span>Breaking Bad (S2E10)</span>
              <span className="title">Over</span>
              <span className="spoiler">
                Walt and Hank get into a heated argument at a party. Skyler opens
                up to her boss. Jane hides her relationship with Jesse from her
                father.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/2/2"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-40">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-40" />
              <span>House (S2E2)</span>
              <span className="title">Autopsy</span>
              <span className="spoiler">
                A girl's unimaginable bravery toward her terminal illness makes
                House suspicious as he puts a life-or-death decision about her
                case in her young hands.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/2/11"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-41">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-41" />
              <span>Breaking Bad (S2E11)</span>
              <span className="title">Mandala</span>
              <span className="spoiler">
                As the end of her pregnancy finds Skyler conflicted about her
                feelings, a dealer's death forces Walt to look for somewhere to
                unload a load of meth.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/2/3"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-42">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-42" />
              <span>House (S2E3)</span>
              <span className="title">Humpty Dumpty</span>
              <span className="spoiler">
                Cuddy struggles with a case of guilt when her handyman is injured
                while at her place, and House and his team have to work fast to
                save the young man's pursuit of the American Dream.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/2/12"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-43">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-43" />
              <span>Breaking Bad (S2E12)</span>
              <span className="title">Phoenix</span>
              <span className="spoiler">
                As Walt explores money laundering options, he and Jesse spar over
                the profits from their latest deal. Jesse and Jane clash with her
                father. Walt makes a fatal decision.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/2/4"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-44">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-44" />
              <span>House (S2E4)</span>
              <span className="title">TB or Not TB</span>
              <span className="spoiler">
                House's patient is willing to die in order to further his social
                cause.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/2/5"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-45">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-45" />
              <span>House (S2E5)</span>
              <span className="title">Daddy's Boy</span>
              <span className="spoiler">
                Lies between a father and son may prevent House and his team from
                saving their patient.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker finale"
          data-id="tv/1396/2/13"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-46">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-46" />
              <span>Breaking Bad (S2E13)</span>
              <span className="title">ABQ</span>
              <span className="spoiler">
                Skyler confronts Walt about his secrecy; Jesse falls apart; and
                Jane's grief-stricken father takes action that results in further
                tragedy.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/2/6"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-47">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-47" />
              <span>House (S2E6)</span>
              <span className="title">Spin</span>
              <span className="spoiler">
                House's wheels start turning when a pro-cyclist admits to taking
                performance-enhancing drugs.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker premier"
          data-id="tv/1396/3/1"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-48">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-48" />
              <span>Breaking Bad (S3E1)</span>
              <span className="title">No Más</span>
              <span className="spoiler">
                Walt faces a new threat, on a new front and deals with an
                increasingly angry Skyler, who must consider what to do next with
                her life and the kids. Meanwhile, Jesse comes face-to-face with
                some startling self-revelations.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/2/7"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-49">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-49" />
              <span>House (S2E7)</span>
              <span className="title">Hunting</span>
              <span className="spoiler">
                A patient with AIDS stalks House to get him to take his case;
                House and Stacy stalk a mouse in her attic; and Cameron faces a
                health scare of her own.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/3/2"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-50">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-50" />
              <span>Breaking Bad (S3E2)</span>
              <span className="title">Caballo sin Nombre</span>
              <span className="spoiler">
                Despite ever-increasing tension between Walt and Skyler, he pulls
                out all the stops in an effort to reconcile with the family.
                Elsewhere, Saul is instrumental in getting Jesse involved in a
                most-unusual investment opportunity.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/2/8"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-51">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-51" />
              <span>House (S2E8)</span>
              <span className="title">The Mistake</span>
              <span className="spoiler">
                A patient's death prompts an investigation into whether Chase or
                House may have been responsible for her death.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/2/9"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-52">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-52" />
              <span>House (S2E9)</span>
              <span className="title">Deception</span>
              <span className="spoiler">
                With Foreman as House's supervisor, the team must figure out if a
                woman who cried wolf too many times is really ill.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/3/3"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-53">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-53" />
              <span>Breaking Bad (S3E3)</span>
              <span className="title">I.F.T.</span>
              <span className="spoiler">
                Walt ignores Skyler's demands, furthering the rift between them
                and pushing her to break bad. Still suffering from panic and
                anxiety attacks, Hank crosses a line at work.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/2/10"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-54">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-54" />
              <span>House (S2E10)</span>
              <span className="title">Failure to Communicate</span>
              <span className="spoiler">
                A journalist's head injury results in unintelligible speech,
                leaving House and his team at a loss; and the heat is turned up
                between House and Stacy when they're out of town.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/3/4"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-55">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-55" />
              <span>Breaking Bad (S3E4)</span>
              <span className="title">Green Light</span>
              <span className="spoiler">
                Walt loses control as he reacts to Skyler's news, endangering his
                job and relationships with Saul and Jesse. Hank throws himself
                into his blue meth investigation. Jesse enacts a new plan.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/2/11"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-56">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-56" />
              <span>House (S2E11)</span>
              <span className="title">Need to Know</span>
              <span className="spoiler">
                While House's staff tries to diagnose a woman whose uncontrollable
                muscle flailing caused her to crash her car, House and Stacy try
                to resolve their relationship issues once and for all. Cameron
                refuses to take her HIV test, wary of the results.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/2/12"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-57">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-57" />
              <span>House (S2E12)</span>
              <span className="title">Distractions</span>
              <span className="spoiler">
                While a severely burned teenager is admitted and his blood tests
                come back with strange results, House makes himself the guinea pig
                in his own unofficial tests of a new drug designed to treat
                migraines to prove a former medical school colleague is wrong
                about the drug.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/3/5"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-58">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-58" />
              <span>Breaking Bad (S3E5)</span>
              <span className="title">Más</span>
              <span className="spoiler">
                Gus increases his efforts to lure Walt back into business, forcing
                a rift between Walt and Jesse. Skyler doubts her new relationship.
                Marie confides in Skyler about her concern for Hank's well-being.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/2/13"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-59">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-59" />
              <span>House (S2E13)</span>
              <span className="title">Skin Deep</span>
              <span className="spoiler">
                House uncovers a startling secret when he treats a teenage
                supermodel for heroin addiction. Meanwhile, Wilson hopes the
                increased leg pain in House's leg is an indication his leg nerves
                are regenerating.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/3/6"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-60">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-60" />
              <span>Breaking Bad (S3E6)</span>
              <span className="title">Sunset</span>
              <span className="spoiler">
                Walt settles into his new surroundings; Walt, Jr. wants answers
                about his parents' relationship; Hank's investigation causes
                problems for Walt and Jesse.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/2/14"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-61">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-61" />
              <span>House (S2E14)</span>
              <span className="title">Sex Kills</span>
              <span className="spoiler">
                House takes the case of a man who experienced a seizure but wasn't
                aware it happened. When the man suffers a heart attack and needs a
                heart transplant, the team races to diagnose a dead woman's
                illness so they can harvest her heart to save their living
                patient.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/3/7"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-62">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-62" />
              <span>Breaking Bad (S3E7)</span>
              <span className="title">One Minute</span>
              <span className="spoiler">
                Hank's increasing volatility forces a confrontation with Jesse and
                trouble at work. Skyler pressures Walt to make a deal. Gus'
                actions have severe consequences.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/2/15"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 109,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 41px)"
              }}
            >
              <label htmlFor="bookmark-63">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-63" />
              <span>House (S2E15)</span>
              <span className="title">Clueless</span>
              <span className="spoiler">
                House believes a woman is trying to kill her husband and tries to
                find the proof to confirm his suspicions. When Wilson moves in
                with House after separating from his wife, he learns Wilson is a
                great cook.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/2/16"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 43px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 47,
              maxHeight: 113,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 31,
                maxHeight: "calc(var(--scale) * 38px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-64">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-64" />
              <span>House (S2E16)</span>
              <span className="title">Safe</span>
              <span className="spoiler">
                A teenage heart transplant patient is rushed to the hospital when
                she has an allergic reaction while living in a "clean" room, and
                House and Wilson work out the kinks of their new living
                arrangement.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/3/8"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-65">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-65" />
              <span>Breaking Bad (S3E8)</span>
              <span className="title">I See You</span>
              <span className="spoiler">
                The family waits for news about Hank. While Jesse covers at the
                lab, Walt attempts to placate Gus. After witnessing a disturbing
                outburst, Walt worries he and his family are in danger.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/2/17"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-66">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-66" />
              <span>House (S2E17)</span>
              <span className="title">All In</span>
              <span className="spoiler">
                When a six-year-old boy is brought in with the same symptoms as
                another patient who died years ago under House's care, House
                believes the cases are identical and he can predict the course of
                the boy's illness. Meanwhile, the clinic hosts a poker night to
                benefit the oncology department.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/3/9"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-67">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-67" />
              <span>Breaking Bad (S3E9)</span>
              <span className="title">Kafkaesque</span>
              <span className="spoiler">
                As Hank's hospital bills stack up, Skyler hatches a plan. Walt and
                Gus come to a better understanding. Jesse, looking for more
                independence, pursues a new opportunity.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/2/18"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-68">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-68" />
              <span>House (S2E18)</span>
              <span className="title">Sleeping Dogs Lie</span>
              <span className="spoiler">
                House has to work fast when a woman comes in with a
                life-threatening case of insomnia. Meanwhile Cameron is angry at
                Foreman for stealing an article she worked on.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/3/10"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-69">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-69" />
              <span>Breaking Bad (S3E10)</span>
              <span className="title">Fly</span>
              <span className="spoiler">
                Walt becomes obsessed with a contaminant in the lab and refuses to
                finish the cook until it is eliminated. A frustrated Jesse
                attempts to get Walt back on track.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/2/19"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-70">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-70" />
              <span>House (S2E19)</span>
              <span className="title">House vs. God</span>
              <span className="spoiler">
                House treats a 15 year old faith healer, while Wilson feels left
                out when he finds out House has a weekly poker game.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/3/11"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-71">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-71" />
              <span>Breaking Bad (S3E11)</span>
              <span className="title">Abiquiu</span>
              <span className="spoiler">
                Skyler gets involved with Walt's business. Hank struggles with his
                recovery. Jesse makes a startling discovery after meeting a girl
                at group therapy.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker part odd"
          data-id="tv/1408/2/20"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-72">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-72" />
              <span>House (S2E20)</span>
              <span className="title">Euphoria (Part 1 of 2)</span>
              <span className="spoiler">
                When a police officer with a gunshot wound to the head and
                uncontrollable laughter is admitted, House and the team are
                baffled. When Foreman begins showing the same symptoms, they race
                to determine the cause of the illness before Foreman's condition
                takes the same path.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker part odd"
          data-id="tv/1408/2/21"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-73">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-73" />
              <span>House (S2E21)</span>
              <span className="title">Euphoria (Part 2 of 2)</span>
              <span className="spoiler">
                Foreman continues to experience the same progression of symptoms
                as the police officer. When he realizes he may be facing imminent
                death, he calls his father who comes to his son's side. As it
                comes down to a race against time, House believes the solution to
                the illness is in the police officer's apartment.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/3/12"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-74">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-74" />
              <span>Breaking Bad (S3E12)</span>
              <span className="title">Half Measures</span>
              <span className="spoiler">
                Against Walt's advice, Jesse lashes out. Fearing for Jesse's
                safety, Walt takes drastic action to intervene and tragic event
                leads to a shocking confrontation.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/2/22"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-75">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-75" />
              <span>House (S2E22)</span>
              <span className="title">Forever</span>
              <span className="spoiler">
                A young mother has a seizure while bathing her newborn son and
                nearly drowns him. House and the team have two cases at one time
                as they try to save the infant and determine the cause of the
                mother's seizures.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker finale"
          data-id="tv/1396/3/13"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-76">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-76" />
              <span>Breaking Bad (S3E13)</span>
              <span className="title">Full Measure</span>
              <span className="spoiler">
                With Jesse on the run and Mike in hot pursuit, Walt negotiates a
                bargain with Gus and concocts a disturbing plan to provide for his
                and Jesse's safety.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/2/23"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-77">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-77" />
              <span>House (S2E23)</span>
              <span className="title">Who's Your Daddy?</span>
              <span className="spoiler">
                A 16-year-old Hurricane Katrina victim suffering from
                hallucinations as a result of the tragedy is brought to House by
                his former bandmate who recently found out the girl is his
                daughter. Although House fears his friend is being scammed, he
                takes the case. As he works his way through the girl's lies so he
                can diagnose and treat her, he's forced to tell a few lies of his
                own.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker finale odd"
          data-id="tv/1408/2/24"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-78">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-78" />
              <span>House (S2E24)</span>
              <span className="title">No Reason</span>
              <span className="spoiler">
                House is shot by a former patient and must share a recovery room
                with the gunman.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker premier"
          data-id="tv/1396/4/1"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-79">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-79" />
              <span>Breaking Bad (S4E1)</span>
              <span className="title">Box Cutter</span>
              <span className="spoiler">
                Walt and Jesse face the deadly consequences of their actions.
                Skyler deals with a puzzling disappearance, as Marie struggles to
                help Hank with his recovery.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker premier odd"
          data-id="tv/1408/3/1"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 112,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 44px)"
              }}
            >
              <label htmlFor="bookmark-80">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-80" />
              <span>House (S3E1)</span>
              <span className="title">Meaning</span>
              <span className="spoiler">
                After recovering from his gunshot wounds, House works feverishly
                on two cases at the same time: a paralyzed man who drove his
                wheelchair into a swimming pool and a woman who became paralyzed
                after a yoga session.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/4/2"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 46px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 50,
              maxHeight: 112,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 34,
                maxHeight: "calc(var(--scale) * 41px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-81">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-81" />
              <span>Breaking Bad (S4E2)</span>
              <span className="title">Thirty-Eight Snub</span>
              <span className="spoiler">
                Walt attempts to form a new alliance as he plans his next move.
                Skyler pushes Walt towards a business opportunity, in hopes of
                protecting the family.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/3/2"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 113,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 45px)"
              }}
            >
              <label htmlFor="bookmark-82">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-82" />
              <span>House (S3E2)</span>
              <span className="title">Cane &amp; Able</span>
              <span className="spoiler">
                House and the team treat a young boy who claims there is a
                tracking device in his neck and believes he has been the subject
                of alien experimentation. Cameron is outraged when she learns
                Cuddy and Wilson have been lying to House about the diagnosis on
                his last case.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/4/3"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 47px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 51,
              maxHeight: 113,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 35,
                maxHeight: "calc(var(--scale) * 42px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-83">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-83" />
              <span>Breaking Bad (S4E3)</span>
              <span className="title">Open House</span>
              <span className="spoiler">
                Events spiral out of control at Jesse’s place. Skyler reluctantly
                asks for Saul’s help. Marie returns to an old pastime and a friend
                asks Hank for help.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/3/3"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-84">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-84" />
              <span>House (S3E3)</span>
              <span className="title">Informed Consent</span>
              <span className="spoiler">
                House puts a well-known medical researcher through a battery of
                tests to determine why he collapsed in his lab. When the team is
                unable to diagnose the problem, the doctor asks the team to help
                him end his life. House is forced to use his cane again after the
                ketamine has worn off as he deals with a clinic patient's teenaged
                daughter who has a crush on him.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/3/4"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 112,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 44px)"
              }}
            >
              <label htmlFor="bookmark-85">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-85" />
              <span>House (S3E4)</span>
              <span className="title">Lines in the Sand</span>
              <span className="spoiler">
                When doctors are unable to diagnose why a severely autistic boy
                screams loudly for no apparent reason, House takes the case. As
                the boy's condition worsens, it becomes obvious that House relates
                to the boy because he has no social niceties.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/4/4"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 46px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 50,
              maxHeight: 112,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 34,
                maxHeight: "calc(var(--scale) * 41px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-86">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-86" />
              <span>Breaking Bad (S4E4)</span>
              <span className="title">Bullet Points</span>
              <span className="spoiler">
                The Cartel takes steps to gain the upper hand. Walt and Skyler
                share an embarrassing secret with the rest of the family. Jesse’s
                activities draw unwanted attention.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/3/5"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-87">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-87" />
              <span>House (S3E5)</span>
              <span className="title">Fools for Love</span>
              <span className="spoiler">
                House takes the case of a young woman who has been rushed to the
                hospital with problems breathing and severe stomach pain after she
                and her husband were robbed. After her husband collapses, the team
                believes the couple's illnesses are related. Meanwhile, Michael
                Tritter, a clinic patient, causes problems for House that could
                have serious ramifications.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/4/5"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 52,
              maxHeight: 113,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 41px)"
              }}
            >
              <label htmlFor="bookmark-88">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-88" />
              <span>Breaking Bad (S4E5)</span>
              <span className="title">Shotgun</span>
              <span className="spoiler">
                When Jesse goes missing, Walt fears the worst. Skyler has an
                unlikely reunion. Hank shares some bad news with Detective Tim
                Roberts.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/3/6"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 43px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 47,
              maxHeight: 113,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 31,
                maxHeight: "calc(var(--scale) * 38px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-89">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-89" />
              <span>House (S3E6)</span>
              <span className="title">Que Será Será</span>
              <span className="spoiler">
                The team encounters logistical problems while trying to run tests
                on a 600-pound man due to his extremely large size. Meanwhile,
                House spends the night in jail after being arrested by Detective
                Tritter for various charges, including resisting arrest.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/4/6"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-90">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-90" />
              <span>Breaking Bad (S4E6)</span>
              <span className="title">Cornered</span>
              <span className="spoiler">
                Skyler makes an unsettling discovery. Walter, Jr. pushes his dad
                into a questionable purchase. Jesse offers Mike some unexpected
                help.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/3/7"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-91">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-91" />
              <span>House (S3E7)</span>
              <span className="title">Son of Coma Guy</span>
              <span className="spoiler">
                House decides to awaken a comatose patient so he can question the
                man regarding the family history of his son, who may have a
                genetic condition and the father is the only living relative.
                Meanwhile, Wilson confronts House about the stolen prescription
                pad as Tritter approaches Cameron, Chase, and Foreman in an
                attempt to divide the team and reveal their loyalties.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/3/8"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-92">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-92" />
              <span>House (S3E8)</span>
              <span className="title">Whac-A-Mole</span>
              <span className="spoiler">
                An 18-year-old teenager is brought to the hospital after having a
                heart attack. House reviews the boy's file and believes he has the
                diagnosis. He then turns the case into a game by sealing his
                opinion in an envelope and challenging Cameron, Foreman, and Chase
                to guess House's diagnosis on their own. Meanwhile, Tritter's
                actions against Wilson continue to strain the oncologist's
                relationship with House and destroy his ability to practice
                medicine.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/4/7"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-93">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-93" />
              <span>Breaking Bad (S4E7)</span>
              <span className="title">Problem Dog</span>
              <span className="spoiler">
                A frustrated Walt gambles on a risky new plan. Skyler's business
                venture hits a snag. Hank recruits Walter, Jr. for an unusual
                outing.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/3/9"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-94">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-94" />
              <span>House (S3E9)</span>
              <span className="title">Finding Judas</span>
              <span className="spoiler">
                House takes the case of a young girl who has been diagnosed with
                pancreatitis. When he takes her divorced parents to court to force
                them to allow treatment because they can't agree, the judge awards
                guardianship of the girl to Cuddy. Meanwhile, Tritter continues
                his strategy to force House to admit to his drug use by offering
                one of the team members a deal.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/4/8"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-95">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-95" />
              <span>Breaking Bad (S4E8)</span>
              <span className="title">Hermanos</span>
              <span className="spoiler">
                Skyler develops an unusual solution to her money troubles. Hank
                enlists Walt to investigate a theory. Walt’s impatience with Jesse
                grows.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/3/10"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-96">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-96" />
              <span>House (S3E10)</span>
              <span className="title">Merry Little Christmas</span>
              <span className="spoiler">
                Wilson arranges for House to make a deal with Tritter, but House
                refuses. Meanwhile, Cuddy cuts House off Vicodin and removes him
                from the team's case: a 15-year-old little person who entered the
                hospital with a collapsed lung and anemia.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/4/9"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-97">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-97" />
              <span>Breaking Bad (S4E9)</span>
              <span className="title">Bug</span>
              <span className="spoiler">
                Skyler's past mistakes come back to haunt her. Gus takes action to
                thwart his rivals. Jesse seeks Walt's help, with mixed results.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/3/11"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-98">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-98" />
              <span>House (S3E11)</span>
              <span className="title">Words and Deeds</span>
              <span className="spoiler">
                House splits his time between treating a firefighter for
                uncontrollable shivering, giving Tritter a piece of his mind, and
                handling his trial for forging prescriptions.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/3/12"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-99">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-99" />
              <span>House (S3E12)</span>
              <span className="title">One Day, One Room</span>
              <span className="spoiler">
                While House is forced to work full-time in the clinic and deal
                with a rape victim who insists on confiding with him, Cameron
                deals with a terminal cancer patient trying to take advantage of
                her state of mind.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/4/10"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 52,
              maxHeight: 113,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 41px)"
              }}
            >
              <label htmlFor="bookmark-100">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-100" />
              <span>Breaking Bad (S4E10)</span>
              <span className="title">Salud</span>
              <span className="spoiler">
                Walt's family worries when he doesn't turn up for Walter, Jr.'s
                16th birthday. Jesse is forced to put his lab skills to the test
                without Mr. White's help.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/3/13"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 43px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 47,
              maxHeight: 112,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 31,
                maxHeight: "calc(var(--scale) * 38px + var(--height-mult) * 45px)"
              }}
            >
              <label htmlFor="bookmark-101">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-101" />
              <span>House (S3E13)</span>
              <span className="title">Needle in a Haystack</span>
              <span className="spoiler">
                House and his staff must deal with a teenage Gypsy boy suffering
                from inexplicable respiratory distress. However, House has bigger
                issues on his mind: Cuddy has given away his handicapped spot.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/4/11"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 47px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 51,
              maxHeight: 113,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 35,
                maxHeight: "calc(var(--scale) * 42px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-102">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-102" />
              <span>Breaking Bad (S4E11)</span>
              <span className="title">Crawl Space</span>
              <span className="spoiler">
                Walt takes drastic action to protect his secret and Gus. Skyler's
                efforts to solve Ted's financial problems hit a wall.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/3/14"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 112,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 44px)"
              }}
            >
              <label htmlFor="bookmark-103">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-103" />
              <span>House (S3E14)</span>
              <span className="title">Insensitive</span>
              <span className="spoiler">
                It's Valentine's Day, and Cuddy has a blind date. Meanwhile, House
                leaves ER duty to take the case of a child patient named Hannah.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/4/12"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 46px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 50,
              maxHeight: 113,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 34,
                maxHeight: "calc(var(--scale) * 41px + var(--height-mult) * 43px)"
              }}
            >
              <label htmlFor="bookmark-104">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-104" />
              <span>Breaking Bad (S4E12)</span>
              <span className="title">End Times</span>
              <span className="spoiler">
                Hank pushes Gomez to pursue one last lead, while Walt struggles to
                protect the family. Jesse gets alarming news and rushes to meet
                with Mr. White.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/3/15"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 45px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 49,
              maxHeight: 111,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 33,
                maxHeight: "calc(var(--scale) * 40px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-105">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-105" />
              <span>House (S3E15)</span>
              <span className="title">Half-Wit</span>
              <span className="spoiler">
                House encounters a brain-damaged musical prodigy with inexplicable
                abilities while the team faces serious concerns about House's own
                health.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/3/16"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 117,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 49px)"
              }}
            >
              <label htmlFor="bookmark-106">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-106" />
              <span>House (S3E16)</span>
              <span className="title">Top Secret</span>
              <span className="spoiler">
                The ex-marine that saved House's life, in a dream he had the day
                before, is admitted in the hospital with symptoms resembling Gulf
                War Syndrome. While House is busy dealing with his own health
                issues, and Chase and Cameron are too busy with each other, the
                ex-marine gets worse.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker finale"
          data-id="tv/1396/4/13"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 51px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 55,
              maxHeight: 117,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 39,
                maxHeight: "calc(var(--scale) * 46px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-107">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-107" />
              <span>Breaking Bad (S4E13)</span>
              <span className="title">Face Off</span>
              <span className="spoiler">
                Walt and Jesse team up to take on Gus. With Saul's help, Walt
                finds an unexpected ally.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/3/17"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 109,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 41px)"
              }}
            >
              <label htmlFor="bookmark-108">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-108" />
              <span>House (S3E17)</span>
              <span className="title">Fetal Position</span>
              <span className="spoiler">
                A famous celebrity photographer suffers from a stroke while being
                pregnant at her early forties. House and his team have to deal
                with a great dilemma, save the mother or her unborn child.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker premier"
          data-id="tv/1396/5/1"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 43px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 47,
              maxHeight: 109,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 31,
                maxHeight: "calc(var(--scale) * 38px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-109">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-109" />
              <span>Breaking Bad (S5E1)</span>
              <span className="title">Live Free or Die</span>
              <span className="spoiler">
                As Walt deals with the aftermath of the Casa Tranquila explosion,
                Hank works to wrap up his investigation of Gus' empire.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/3/18"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-110">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-110" />
              <span>House (S3E18)</span>
              <span className="title">Airborne</span>
              <span className="spoiler">
                On House and Cuddy's flight from Singapore a passenger gets ill
                and Cuddy suspects an epidemic. At the hospital, Wilson leads the
                team as they deal with a middle-aged woman suffering from
                seizures.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/5/2"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-111">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-111" />
              <span>Breaking Bad (S5E2)</span>
              <span className="title">Madrigal</span>
              <span className="spoiler">
                Walt and Jesse pursue an unlikely business partner. The DEA
                filters through various leads in hopes of finding something.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/3/19"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-112">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-112" />
              <span>House (S3E19)</span>
              <span className="title">Act Your Age</span>
              <span className="spoiler">
                A 6-year-old girl suffers ailments expected in patients much
                older. Tensions between Chase and Cameron lead House to
                intentionally assign them to the same tasks, including
                investigating the young girl's home.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/3/20"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-113">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-113" />
              <span>House (S3E20)</span>
              <span className="title">House Training</span>
              <span className="spoiler">
                The doctors try to find what's wrong with a scam artist who
                collapses after her brain "freezes," but the case becomes personal
                for Foreman.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/5/3"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-114">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-114" />
              <span>Breaking Bad (S5E3)</span>
              <span className="title">Hazard Pay</span>
              <span className="spoiler">
                Walt and Jesse formulate a new business plan. Walt shares a secret
                with Marie.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/3/21"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-115">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-115" />
              <span>House (S3E21)</span>
              <span className="title">Family</span>
              <span className="spoiler">
                Wilson prepares to transplant bone marrow from Matty to his
                brother Nick. But when Matty gets sick, the team must cure him as
                he's the only safe donor. Meanwhile Foreman deals with the
                consequences of his mistake and House has a battle of wills with
                his new pet Hector.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/5/4"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-116">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-116" />
              <span>Breaking Bad (S5E4)</span>
              <span className="title">Fifty-One</span>
              <span className="spoiler">
                Walt celebrates another birthday. Skyler contemplates her options,
                and an associate puts a crimp in Walt and Jesse's business
                strategy.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/3/22"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 115,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 47px)"
              }}
            >
              <label htmlFor="bookmark-117">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-117" />
              <span>House (S3E22)</span>
              <span className="title">Resignation</span>
              <span className="spoiler">
                The team deals with a 19-year-old college student, while Foreman
                suddenly and without a reason hands in his resignation. House
                seems to have already found Foreman's replacement, an attractive
                nutritionist named Honey.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/5/5"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 49px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 53,
              maxHeight: 115,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 37,
                maxHeight: "calc(var(--scale) * 44px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-118">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-118" />
              <span>Breaking Bad (S5E5)</span>
              <span className="title">Dead Freight</span>
              <span className="spoiler">
                Walt's team gets creative to obtain the methylamine they need to
                continue their operation.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/3/23"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-119">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-119" />
              <span>House (S3E23)</span>
              <span className="title">The Jerk</span>
              <span className="spoiler">
                House treats a 16-year-old chess prodigy who gets everyone on the
                team annoyed with his behavior. Foreman is upset with House
                because he thinks his boss sabotaged his job interview with
                another hospital.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker finale odd"
          data-id="tv/1408/3/24"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-120">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-120" />
              <span>House (S3E24)</span>
              <span className="title">Human Error</span>
              <span className="spoiler">
                A Cuban couple attempt to get to America by raft... to see House
                about the wife's heart condition. But when she gets worse House
                wonders if someone on his staff messed up. Meanwhile Foreman
                prepares to leave and his departure threatens to shake up the
                entire team.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/5/6"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-121">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-121" />
              <span>Breaking Bad (S5E6)</span>
              <span className="title">Buyout</span>
              <span className="spoiler">
                Walt, Jesse, and Mike struggle over the future of their business,
                as occupational hazards weigh on Jesse.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker premier odd"
          data-id="tv/1408/4/1"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-122">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-122" />
              <span>House (S4E1)</span>
              <span className="title">Alone</span>
              <span className="spoiler">
                With his diagnostic team gone, House tries to diagnose a young
                woman who survived an office building collapse. With the condition
                getting worse, Cuddy puts pressure on House to hire a new team,
                but instead attempts a differential diagnosis with help from the
                janitor.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/5/7"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-123">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-123" />
              <span>Breaking Bad (S5E7)</span>
              <span className="title">Say My Name</span>
              <span className="spoiler">
                Walt takes control of business matters; Mike deals with the
                consequences of his actions.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/4/2"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-124">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-124" />
              <span>House (S4E2)</span>
              <span className="title">The Right Stuff</span>
              <span className="spoiler">
                House is secretly trying to treat a fighter pilot who is a
                candidate for NASA's astronaut training program. Her diagnosis
                will be the test to choose which ones of the 40 applicants are
                going to take the empty spots in his team.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/5/8"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-125">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-125" />
              <span>Breaking Bad (S5E8)</span>
              <span className="title">Gliding Over All</span>
              <span className="spoiler">
                Walt takes care of loose ends; Walt makes a dangerous decision.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/4/3"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-126">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-126" />
              <span>House (S4E3)</span>
              <span className="title">97 Seconds</span>
              <span className="spoiler">
                The candidates are now two teams of five women and five men,
                competing on diagnosing and treating a wheelchair-bound man.
                Meanwhile House does experiments on himself to test what happens
                after death, and Foreman, at another hospital, is treating his
                team in a House-like manner.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/4/4"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-127">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-127" />
              <span>House (S4E4)</span>
              <span className="title">Guardian Angels</span>
              <span className="spoiler">
                House finds that some of his own fellowship students will do
                whatever it takes, when they deal with a woman who believes she
                can talk to the dead.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/5/9"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-128">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-128" />
              <span>Breaking Bad (S5E9)</span>
              <span className="title">Blood Money</span>
              <span className="spoiler">
                As Walt and Jesse adjust to life out of the business, Hank
                grapples with a troubling lead.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/4/5"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-129">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-129" />
              <span>House (S4E5)</span>
              <span className="title">Mirror Mirror</span>
              <span className="spoiler">
                House deals with a patient who mirrors the personality of anyone
                he meets. Meanwhile, Foreman is put in charge of overseeing the
                fellowship candidates.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/5/10"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-130">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-130" />
              <span>Breaking Bad (S5E10)</span>
              <span className="title">Buried</span>
              <span className="spoiler">
                While Skyler's past catches up with her, Walt covers his tracks.
                Jesse continues to struggle with his guilt.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/4/6"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-131">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-131" />
              <span>House (S4E6)</span>
              <span className="title">Whatever It Takes</span>
              <span className="spoiler">
                Based on practically no information and no medical history about a
                mystery patient sent by the CIA, House is using some unorthodox
                methods to diagnose and treat him. Meanwhile the remaining
                candidates are questioning Foreman's judgment.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/4/7"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-132">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-132" />
              <span>House (S4E7)</span>
              <span className="title">Ugly</span>
              <span className="spoiler">
                A film crew and the candidates are following around House
                distracting him while he is trying to diagnose a teenager who
                suffers from a heart attack prior to a serious plastic surgery.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/5/11"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-133">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-133" />
              <span>Breaking Bad (S5E11)</span>
              <span className="title">Confessions</span>
              <span className="spoiler">
                Jesse decides to make a change, while Walt and Skyler try to deal
                with an unexpected demand.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/4/8"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-134">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-134" />
              <span>House (S4E8)</span>
              <span className="title">You Don't Want to Know</span>
              <span className="spoiler">
                House treats a magician but comes to believe he's faking illness
                to cover up his own incompetence. Meanwhile, House pits the
                fellows against each other in his version of an immunity
                challenge.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/5/12"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-135">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-135" />
              <span>Breaking Bad (S5E12)</span>
              <span className="title">Rabid Dog</span>
              <span className="spoiler">
                An unusual strategy starts to bear fruit, while plans are set in
                motion that could change everything.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/4/9"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 113,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 45px)"
              }}
            >
              <label htmlFor="bookmark-136">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-136" />
              <span>House (S4E9)</span>
              <span className="title">Games</span>
              <span className="spoiler">
                Under Cuddy’s pressure to choose his team, House gives the
                candidates a case of a former punk rock star who is a drug user.
                Whoever diagnoses the patient is going to have a future as a
                member of House’s team.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/5/13"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 47px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 51,
              maxHeight: 113,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 35,
                maxHeight: "calc(var(--scale) * 42px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-137">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-137" />
              <span>Breaking Bad (S5E13)</span>
              <span className="title">To'hajiilee</span>
              <span className="spoiler">
                Things heat up for Walt in unexpected ways.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/4/10"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-138">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-138" />
              <span>House (S4E10)</span>
              <span className="title">It's a Wonderful Lie</span>
              <span className="spoiler">
                A mother's sudden paralysis during a indoor rock-climbing incident
                leaves her daughter injured, and House's new team looking for a
                cure. Meanwhile, House organizes his new recruits' Secret Santa
                gift exchange... with a few twists of his own.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/4/11"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-139">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-139" />
              <span>House (S4E11)</span>
              <span className="title">Frozen</span>
              <span className="spoiler">
                House and his team have to diagnose a case at a distance when a
                researcher at a South Pole base is taken ill.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/5/14"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-140">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-140" />
              <span>Breaking Bad (S5E14)</span>
              <span className="title">Ozymandias</span>
              <span className="spoiler">
                Everyone copes with radically changed circumstances.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/4/12"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 120,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 52px)"
              }}
            >
              <label htmlFor="bookmark-141">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-141" />
              <span>House (S4E12)</span>
              <span className="title">Don't Ever Change</span>
              <span className="spoiler">
                House and his team must diagnose a Jewish bride who is taken ill
                at her wedding. However, House is more interested in analyzing
                Wilson's relationship with his new girlfriend.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/1396/5/15"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 54px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 58,
              maxHeight: 120,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 42,
                maxHeight: "calc(var(--scale) * 49px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-142">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-142" />
              <span>Breaking Bad (S5E15)</span>
              <span className="title">Granite State</span>
              <span className="spoiler">
                Events set in motion long ago move toward a conclusion.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/4/13"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-143">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-143" />
              <span>House (S4E13)</span>
              <span className="title">No More Mr. Nice Guy</span>
              <span className="spoiler">
                House copes with a patient whose symptoms conceal a greater
                problem, but spends much of his time dodging Cuddy's orders to
                give performance reviews, and fighting with Amber over who gets to
                spend more time with Wilson.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/4/14"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 122,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 54px)"
              }}
            >
              <label htmlFor="bookmark-144">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-144" />
              <span>House (S4E14)</span>
              <span className="title">Living the Dream</span>
              <span className="spoiler">
                House is convinced one of the actors on his favorite soap opera
                “Prescription Passion” has a serious medical condition after
                observing his symptoms on television. House decides to intervene
                and take matters into his own hands, but both the actor and
                House's own team dismiss House’s assessment and do not believe
                there is anything wrong with him.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker finale"
          data-id="tv/1396/5/16"
          data-title="Breaking Bad"
          style={{
            height: "calc(var(--scale) * 56px)",
            marginLeft: 4,
            backgroundColor: "rgb(159, 191, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 60,
              maxHeight: 122,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 44,
                maxHeight: "calc(var(--scale) * 51px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-145">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-145" />
              <span>Breaking Bad (S5E16)</span>
              <span className="title">Felina</span>
              <span className="spoiler">All bad things must come to an end.</span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker part odd"
          data-id="tv/1408/4/15"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-146">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-146" />
              <span>House (S4E15)</span>
              <span className="title">House's Head (Arc 1 of 2)</span>
              <span className="spoiler">
                A bus accident leaves House with serious head trauma and partial
                amnesia. He comes to believe that a patient on the bus had a
                life-threatening disease and struggles to recall who it was, and
                what they had.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker part finale odd"
          data-id="tv/1408/4/16"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 189,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight:
                  "calc(var(--scale) * 39px + var(--height-mult) * 121px)"
              }}
            >
              <label htmlFor="bookmark-147">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-147" />
              <span>House (S4E16)</span>
              <span className="title">Wilson's Heart (Arc 2 of 2)</span>
              <span className="spoiler">
                In the aftermath of the bus accident, House struggles with his
                head injuries and short-term memory loss, and must deal with a
                concerned Wilson who believes his friend's health may be in
                danger.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="movie/559969"
          data-title="El Camino: A Breaking Bad Movie"
          style={{
            height: "calc(var(--scale) * 123px)",
            marginLeft: 4,
            backgroundColor: "rgb(191, 0, 0)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 127,
              maxHeight: 189,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 111,
                maxHeight:
                  "calc(var(--scale) * 118px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-148">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-148" />
              <span className="title">El Camino: A Breaking Bad Movie</span>
              <span className="spoiler">
                In the wake of his dramatic escape from captivity, Jesse Pinkman
                must come to terms with his past in order to forge some kind of
                future.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker premier odd"
          data-id="tv/1408/5/1"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-149">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-149" />
              <span>House (S5E1)</span>
              <span className="title">Dying Changes Everything</span>
              <span className="spoiler">
                In the aftermath of personal tragedy, Wilson resigns from the
                hospital... and from his friendship with House. Meanwhile,
                Thirteen struggles with her personal medical problems while
                helping treat an executive assistant with a similar situation to
                her own.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/5/2"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-150">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-150" />
              <span>House (S5E2)</span>
              <span className="title">Not Cancer</span>
              <span className="spoiler">
                The team deals with an organ donor whose organs prove fatal, and
                the two surviving patients. Meanwhile, House hires a private
                detective to spy on Wilson, but hears a few things about himself
                that he'd rather not.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/5/3"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 120,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 52px)"
              }}
            >
              <label htmlFor="bookmark-151">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-151" />
              <span>House (S5E3)</span>
              <span className="title">Adverse Events</span>
              <span className="spoiler">
                A painter's undiagnosed illness affects his work, and House and
                his team must look at the man's paintings to determine what's
                wrong with him.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker premier"
          data-id="tv/60059/1/1"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 54px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 58,
              maxHeight: 120,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 42,
                maxHeight: "calc(var(--scale) * 49px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-152">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-152" />
              <span>Better Call Saul (S1E1)</span>
              <span className="title">Uno</span>
              <span className="spoiler">
                Jimmy works his magic in the courtroom. Unexpected inspiration
                leads him to an unconventional pursuit of potential clients.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/5/4"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 113,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 45px)"
              }}
            >
              <label htmlFor="bookmark-153">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-153" />
              <span>House (S5E4)</span>
              <span className="title">Birthmarks</span>
              <span className="spoiler">
                While en route to his father's funeral, House must help the team
                with a differential diagnosis on a young Chinese girl who has
                collapsed under mysterious circumstances.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/1/2"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 47px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 51,
              maxHeight: 113,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 35,
                maxHeight: "calc(var(--scale) * 42px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-154">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-154" />
              <span>Better Call Saul (S1E2)</span>
              <span className="title">Mijo</span>
              <span className="spoiler">
                As his troubles escalate to a boiling point, Jimmy finds himself
                in dire straits. An act of carelessness puts Chuck at risk.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/5/5"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-155">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-155" />
              <span>House (S5E5)</span>
              <span className="title">Lucky Thirteen</span>
              <span className="spoiler">
                Thirteen brings her one-night stand to the hospital after the
                woman has a seizure. However, the woman admits she slept with
                Thirteen just so she could get to House and have him diagnose her
                condition. Meanwhile, House continues to pay Lucas to spy on
                Wilson.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/1/3"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-156">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-156" />
              <span>Better Call Saul (S1E3)</span>
              <span className="title">Nacho</span>
              <span className="spoiler">
                Jimmy pulls out all the stops to prove that his dangerous client
                is innocent, even though it causes some friction with Kim.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/5/6"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-157">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-157" />
              <span>House (S5E6)</span>
              <span className="title">Joy</span>
              <span className="spoiler">
                An ailing man suffers from blackouts and sleepwalks, leading the
                team to wonder if his sleepwalking is a symptom, or how the man is
                becoming exposed to something else. When the man's daughter grows
                ill as well, the team must provide a diagnosis before both die.
                Meanwhile, Cuddy adopts a newborn but when the birth mother
                displays a rash, she has to make a decision between putting the
                mother or daughter at risk.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/5/7"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 113,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 45px)"
              }}
            >
              <label htmlFor="bookmark-158">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-158" />
              <span>House (S5E7)</span>
              <span className="title">The Itch</span>
              <span className="spoiler">
                The team must treat an agoraphobic who refuses to leave his house,
                and have to work around Cuddy, who is less than thrilled at having
                hospital equipment relocated. Meanwhile, House is plagued by an
                itch, and Cameron and Chase have relationship issues.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/1/4"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 47px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 51,
              maxHeight: 113,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 35,
                maxHeight: "calc(var(--scale) * 42px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-159">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-159" />
              <span>Better Call Saul (S1E4)</span>
              <span className="title">Hero</span>
              <span className="spoiler">
                Jimmy devises a bold plan to obtain new clients, but must face
                consequences when his relationships become strained.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/5/8"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 111,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 43px)"
              }}
            >
              <label htmlFor="bookmark-160">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-160" />
              <span>House (S5E8)</span>
              <span className="title">Emancipation</span>
              <span className="spoiler">
                While Foreman takes on a pediatric case on his own, the rest of
                the team deals with a 16-year-old factory manager and emancipated
                minor who collapses at work. When Foreman's patient takes a turn
                for the worse, he's forced to question whether he can deal with
                the situation on his own, or if he needs House's help.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/1/5"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 45px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 49,
              maxHeight: 117,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 33,
                maxHeight: "calc(var(--scale) * 40px + var(--height-mult) * 48px)"
              }}
            >
              <label htmlFor="bookmark-161">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-161" />
              <span>Better Call Saul (S1E5)</span>
              <span className="title">Alpine Shepherd Boy</span>
              <span className="spoiler">
                Alarming news disrupts Jimmy's efforts at drumming up new
                business, forcing him to make a difficult choice.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/5/9"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 50px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 54,
              maxHeight: 115,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 38,
                maxHeight: "calc(var(--scale) * 45px + var(--height-mult) * 41px)"
              }}
            >
              <label htmlFor="bookmark-162">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-162" />
              <span>House (S5E9)</span>
              <span className="title">Last Resort</span>
              <span className="spoiler">
                A gun-wielding man from the waiting room at the
                Princeton-Plainsboro clinic takes House, Thirteen and several
                patients from the waiting room hostage in Cuddy's office. The man
                claims to be sick with a long undiagnosed illness and demands
                medical attention from the best doctor in the hospital,
                threatening to kill any hostages necessary along the way.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/1/6"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 43px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 47,
              maxHeight: 109,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 31,
                maxHeight: "calc(var(--scale) * 38px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-163">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-163" />
              <span>Better Call Saul (S1E6)</span>
              <span className="title">Five-O</span>
              <span className="spoiler">
                Mike's tragic past comes back to haunt him, and he's forced to
                seek help from an unusual source. Jimmy's moral compass is put to
                the test.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/5/10"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-164">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-164" />
              <span>House (S5E10)</span>
              <span className="title">Let Them Eat Cake</span>
              <span className="spoiler">
                The team takes on the case of a fitness guru on an all-natural
                diet who collapsed while filming a video. Meanwhile, Foreman
                conducts Huntington's Disease drug trials and Thirteen signs on as
                a subject, Cuddy is forced to move into House's office, and Kutner
                uses House's name to run an online medical-advice website.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/1/7"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-165">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-165" />
              <span>Better Call Saul (S1E7)</span>
              <span className="title">Bingo</span>
              <span className="spoiler">
                Jimmy meets with potential new clients. Then, when given the
                opportunity to do the right thing, he cashes in a favor from an
                unlikely ally.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/5/11"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)",
              maxHeight: 110
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-166">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-166" />
              <span>House (S5E11)</span>
              <span className="title">Joy to the World</span>
              <span className="spoiler">
                House and his team deal with a bullied girl who collapses during
                her school's Christmas program. Meanwhile, Foreman and Thirteen
                grow closer during the Huntington's disease drug trials, House
                gives a patient a gift, the staff wonder who gave House a special
                gift, and Cuddy gets an unexpected gift.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/5/12"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-167">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-167" />
              <span>House (S5E12)</span>
              <span className="title">Painless</span>
              <span className="spoiler">
                House and the team try to diagnose a man living with severe,
                chronic pain; Thirteen and Foreman explore their complicated
                relationship; Cuddy discovers that caring for her baby leaves her
                with little time to run the hospital.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/1/8"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-168">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-168" />
              <span>Better Call Saul (S1E8)</span>
              <span className="title">RICO</span>
              <span className="spoiler">
                Jimmy shows Chuck that he's willing to do almost anything to win a
                case, even if it means getting his hands dirty.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/5/13"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-169">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-169" />
              <span>House (S5E13)</span>
              <span className="title">Big Baby</span>
              <span className="spoiler">
                Cuddy decides to spend more time at home to take care of her newly
                adopted baby and passes some of her day-to-day responsibilities
                off to Cameron, including supervising House. Cameron is forced to
                play House’s games and becomes involved in a power struggle as he
                and the team take on the case of a Special Education teacher who
                collapsed after spitting up blood in the middle of class. As House
                tests Cameron’s tolerance for his extreme measures, the patient
                continues to fall ill and House insists the teacher’s seemingly
                inherent goodness is actually a pathology.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/1/9"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-170">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-170" />
              <span>Better Call Saul (S1E9)</span>
              <span className="title">Pimento</span>
              <span className="spoiler">
                Chuck urges Jimmy to accept a harsh truth. Meanwhile, a deal
                threatens to go off the rails when Mike's ability to complete a
                job is called into question.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/5/14"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 116,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 48px)"
              }}
            >
              <label htmlFor="bookmark-171">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-171" />
              <span>House (S5E14)</span>
              <span className="title">The Greater Good</span>
              <span className="spoiler">
                House and the team take on the case of a woman who collapsed in
                the middle of a cooking class, and they soon learn she is a
                highly-renowned cancer researcher who recently gave up her entire
                career in order to pursue her own personal happiness. Though the
                team struggles to understand how the woman could give up saving
                lives for the sake of her own contentment, each grapple with the
                pursuit of happiness (or lack thereof) in their own lives. As the
                patient’s condition continues to worsen, so does Thirteen’s as she
                begins to suffer serious and life-threatening reactions to the
                experimental Huntington’s Disease clinical trial. Meanwhile, Cuddy
                attempts to make House’s life miserable for him in retaliation for
                his part in her own unhappiness.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker finale"
          data-id="tv/60059/1/10"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 50px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 54,
              maxHeight: 116,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 38,
                maxHeight: "calc(var(--scale) * 45px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-172">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-172" />
              <span>Better Call Saul (S1E10)</span>
              <span className="title">Marco</span>
              <span className="spoiler">
                In the aftermath of recent events, Jimmy seizes an opportunity to
                reconnect with an old friend. Chuck adjusts to a new way of life.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/5/15"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-173">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-173" />
              <span>House (S5E15)</span>
              <span className="title">Unfaithful</span>
              <span className="spoiler">
                When a priest who runs a homeless shelter sees a bleeding Jesus
                hovering at his doorstep, he is admitted to the ER. House takes on
                the case as a distraction for the team while he confronts Foreman
                and Thirteen about their relationship. The team soon learns the
                priest had been involved in a molestation scandal that caused him
                to lose his faith. However, just as they are about to dismiss his
                case, the patient’s condition takes a drastic turn for the worse,
                and House grapples with his past and his belief
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/5/16"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 113,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 45px)"
              }}
            >
              <label htmlFor="bookmark-174">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-174" />
              <span>House (S5E16)</span>
              <span className="title">The Softer Side</span>
              <span className="spoiler">
                A patient with both male and female DNA has the team stumped.
                Meanwhile, House starts acting nicely, raising Cuddy's and
                Wilson's suspicions that something is terribly wrong.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker premier"
          data-id="tv/60059/2/1"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 47px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 51,
              maxHeight: 113,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 35,
                maxHeight: "calc(var(--scale) * 42px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-175">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-175" />
              <span>Better Call Saul (S2E1)</span>
              <span className="title">Switch</span>
              <span className="spoiler">
                Jimmy and Kim's relationship takes a new turn. Mike decides it's
                for the best to sever his affiliation with an unrestrained
                associate.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/5/17"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-176">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-176" />
              <span>House (S5E17)</span>
              <span className="title">The Social Contract</span>
              <span className="spoiler">
                House and the team take on the case of Nick, a book editor who
                loses his inhibitions. The team realizes Nick has frontal lobe
                disinhibition, which causes him to speak his mind having no
                control over what he says and making him just like House.
                Meanwhile, House suspects Wilson and Taub are keeping something
                from him.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/2/2"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-177">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-177" />
              <span>Better Call Saul (S2E2)</span>
              <span className="title">Cobbler</span>
              <span className="spoiler">
                To keep a potentially messy situation from unraveling, Mike
                brokers a deal. Jimmy works to exonerate an eccentric client.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/5/18"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 109,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 41px)"
              }}
            >
              <label htmlFor="bookmark-178">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-178" />
              <span>House (S5E18)</span>
              <span className="title">Here Kitty</span>
              <span className="spoiler">
                Morgan works in a nursing home with a pet cat who only sleeps next
                to people if they are about to die - and does so with alarmingly
                accuracy. When it seems the cat has predicted her own death,
                Morgan, convinced she is about to die, fakes a seizure in order to
                get to House to have him diagnose her before it’s too late.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/2/3"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 43px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 47,
              maxHeight: 109,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 31,
                maxHeight: "calc(var(--scale) * 38px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-179">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-179" />
              <span>Better Call Saul (S2E3)</span>
              <span className="title">Amarillo</span>
              <span className="spoiler">
                Jimmy's client outreach efforts thrive, and he exhibits new
                heights of showmanship. Mike is perplexed by daughter-in-law
                Stacey's troubling news.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/5/19"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-180">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-180" />
              <span>House (S5E19)</span>
              <span className="title">Locked In</span>
              <span className="spoiler">
                A man awakens in New York after a bicycle accident unable to move
                or communicate in any way. House, himself injured in a motorcycle
                mishap, occupies the hospital bed next to Lee and quickly annoys
                the doctors treating them both by insisting that Lee has
                “locked-in” syndrome.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/5/20"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-181">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-181" />
              <span>House (S5E20)</span>
              <span className="title">Simple Explanation</span>
              <span className="spoiler">
                Charlotte, an older woman who has spent the last six months taking
                care of her dying husband Eddie, is rushed to Princeton Plainsboro
                after collapsing from respiratory failure. The couple becomes a
                double mystery for the team when Eddie begins to improve as
                Charlotte’s condition worsens. The previously unthinkable becomes
                real when it seems that Charlotte will die before Eddie, and the
                team will be forced to make a difficult decision.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/2/4"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-182">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-182" />
              <span>Better Call Saul (S2E4)</span>
              <span className="title">Gloves Off</span>
              <span className="spoiler">
                Jimmy's actions unexpectedly create waves for Kim. Mike cautiously
                weighs a lucrative proposal that might bring about dire
                consequences.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/5/21"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 112,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 44px)"
              }}
            >
              <label htmlFor="bookmark-183">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-183" />
              <span>House (S5E21)</span>
              <span className="title">Saviors</span>
              <span className="spoiler">
                Cameron postpones her vacation with Chase in order to ask House to
                accept the case of an environmental radical who collapsed at a
                protest with unexplainable symptoms. Although suspicious of her
                motives, House agrees. Since she pushed him to take the case so
                emphatically, House forces Cameron to take the lead and run many
                of the tests on the patient. Meanwhile, House is unsure of
                Wilson’s new healthy diet.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/2/5"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 46px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 50,
              maxHeight: 112,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 34,
                maxHeight: "calc(var(--scale) * 41px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-184">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-184" />
              <span>Better Call Saul (S2E5)</span>
              <span className="title">Rebecca</span>
              <span className="spoiler">
                Jimmy becomes frustrated with his restrictive work environment.
                Kim pulls out all the stops to dig herself out of a seemingly
                bottomless hole at HHM.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/5/22"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 113,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 45px)"
              }}
            >
              <label htmlFor="bookmark-185">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-185" />
              <span>House (S5E22)</span>
              <span className="title">House Divided</span>
              <span className="spoiler">
                The team takes on the case of a deaf 14-year-old named Seth who
                collapsed after he started “hearing” explosions while competing in
                a wrestling match. When the team tries to test him for seizures,
                Seth loses vision in one eye, complicating House’s bunk theory of
                “Exploding Head Syndrome.” As his condition worsens, the team has
                an ethical disagreement about the patient and his mother’s adamant
                decision to forego cochlear implants to supplement his hearing.
                When the prospect of giving Seth the ability to hear for the first
                time in his life arises, House and the team are faced with a
                resounding decision. Meanwhile, House’s lack of sleep starts to
                play tricks on his mind, but he finds his insomnia may be a gift
                instead of a burden
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/2/6"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 47px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 51,
              maxHeight: 113,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 35,
                maxHeight: "calc(var(--scale) * 42px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-186">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-186" />
              <span>Better Call Saul (S2E6)</span>
              <span className="title">Bali Ha'i</span>
              <span className="spoiler">
                Jimmy finds comfort in familiarity. Kim receives a life-changing
                proposal. When he is threatened, Mike finds himself pushed to the
                limit.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/5/23"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 109,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 41px)"
              }}
            >
              <label htmlFor="bookmark-187">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-187" />
              <span>House (S5E23)</span>
              <span className="title">Under My Skin</span>
              <span className="spoiler">
                House and the team take on the case of a ballerina whose lungs
                collapse in the middle of a performance. When the treatment causes
                her skin to fall off, the dancer faces not only the prospect of
                never dancing again but also of dying an agonizing death. The team
                must use their imaginations to carefully choreograph ways to test
                and treat her delicate body without killing her. Meanwhile, House
                continues to suffer from what he thinks is insomnia, and he is
                willing to go to desperate measures to cure it.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/2/7"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 43px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 47,
              maxHeight: 109,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 31,
                maxHeight: "calc(var(--scale) * 38px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-188">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-188" />
              <span>Better Call Saul (S2E7)</span>
              <span className="title">Inflatable</span>
              <span className="spoiler">
                Mike's growing frustration shows when his hand is forced, but with
                Jimmy's help, he works to keep the peace. Meanwhile, Jimmy boldly
                forges a new path forward.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker finale odd"
          data-id="tv/1408/5/24"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 115,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 47px)"
              }}
            >
              <label htmlFor="bookmark-189">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-189" />
              <span>House (S5E24)</span>
              <span className="title">Both Sides Now</span>
              <span className="spoiler">
                House and the team are intrigued by Scott, a man whose left brain
                and right brain operate independently, leaving him with two
                distinct personalities and no control over some of his actions. As
                the two sides of Scott’s brain struggle for dominance, his warring
                personalities make it increasingly difficult for the team to
                figure out what is causing the unique problem. The team is forced
                to use some unusual methods to get him to cooperate with their
                necessary testing. Meanwhile, when House refuses to make an
                appearance in the clinic, Cuddy takes an unconventional approach
                to force House to make up the time with a particular patient.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/2/8"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 49px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 53,
              maxHeight: 116,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 37,
                maxHeight: "calc(var(--scale) * 44px + var(--height-mult) * 43px)"
              }}
            >
              <label htmlFor="bookmark-190">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-190" />
              <span>Better Call Saul (S2E8)</span>
              <span className="title">Fifi</span>
              <span className="spoiler">
                Mike aims to settle the score with an enemy; an unexpected
                opportunity presents itself to Jimmy.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker part premier odd"
          data-id="tv/1408/6/1"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 45px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 49,
              maxHeight: 112,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 33,
                maxHeight: "calc(var(--scale) * 40px + var(--height-mult) * 43px)"
              }}
            >
              <label htmlFor="bookmark-191">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-191" />
              <span>House (S6E1)</span>
              <span className="title">Broken (Part 1 of 2)</span>
              <span className="spoiler">
                House engages in a battle of wits and wills against the attending
                physician in charge of his detox program. When he starts to lose,
                House resorts to blackmail to gain the upper hand.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker part odd"
          data-id="tv/1408/6/2"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 45px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 49,
              maxHeight: 117,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 33,
                maxHeight: "calc(var(--scale) * 40px + var(--height-mult) * 48px)"
              }}
            >
              <label htmlFor="bookmark-192">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-192" />
              <span>House (S6E2)</span>
              <span className="title">Broken (Part 2 of 2)</span>
              <span className="spoiler">
                House asks Alvie to help him uncover incriminating information
                about Dr. Nolan that would allow him to blackmail his way out of
                the treatment center and convinces Lydia to loan him her car to
                sneak out a delusional patient in an attempt by House to undermine
                Dr. Nolan's course of treatment. But when devastating events
                ensue, House is humbled into reluctantly accepting help.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/2/9"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 50px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 54,
              maxHeight: 116,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 38,
                maxHeight: "calc(var(--scale) * 45px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-193">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-193" />
              <span>Better Call Saul (S2E9)</span>
              <span className="title">Nailed</span>
              <span className="spoiler">
                Mike takes a methodical approach to his mission. Someone questions
                Chuck's capabilities. Jimmy faces a personal dilemma.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/6/3"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 115,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 47px)"
              }}
            >
              <label htmlFor="bookmark-194">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-194" />
              <span>House (S6E3)</span>
              <span className="title">Epic Fail</span>
              <span className="spoiler">
                House returns home to Princeton where he continues to focus on his
                recovery, but surprises Cuddy with the news that he's making a big
                change in his life. Meanwhile, the team is unable to diagnose a
                loud-mouthed video game creator who posts each new symptom on the
                internet and opts for treatments suggested by the online community
                rather than by the doctors, and Foreman angles for House's job,
                but the pressure to solve the case creates tension in his
                relationship with Thirteen.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker finale"
          data-id="tv/60059/2/10"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 49px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 53,
              maxHeight: 115,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 37,
                maxHeight: "calc(var(--scale) * 44px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-195">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-195" />
              <span>Better Call Saul (S2E10)</span>
              <span className="title">Klick</span>
              <span className="spoiler">
                Jimmy must make a hard choice. Mike takes control of matters.
                Hamlin delivers shocking news.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/6/4"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-196">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-196" />
              <span>House (S6E4)</span>
              <span className="title">The Tyrant</span>
              <span className="spoiler">
                When a controversial African politician falls ill, he is brought
                to Princeton Plainsboro for treatment. The team struggles with
                whether to help a merciless dictator being subpoenaed for crimes
                against humanity in his country. Meanwhile, Wilson tries to make
                peace with a feuding neighbor, but House’s prying exacerbates the
                problem.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/6/5"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 118,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 50px)"
              }}
            >
              <label htmlFor="bookmark-197">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-197" />
              <span>House (S6E5)</span>
              <span className="title">Instant Karma</span>
              <span className="spoiler">
                A wealthy businessman brings his teenage son, who is suffering
                from inexplicable stomach pains, to Princeton Plainsboro and
                insists on having Dr. House handle the case. The father of the
                patient believes the karmic penalty of his financial success is
                that he is victim to personal tragedy, and that the answer to his
                son's medical mystery lies in a reverse of fate rather than
                medical treatment. Meanwhile, Foreman and Chase prepare to present
                information on the Dibala case.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker premier"
          data-id="tv/60059/3/1"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 52px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 56,
              maxHeight: 118,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 40,
                maxHeight: "calc(var(--scale) * 47px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-198">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-198" />
              <span>Better Call Saul (S3E1)</span>
              <span className="title">Mabel</span>
              <span className="spoiler">
                Jimmy and Chuck's relationship deteriorates. Kim feels the
                pressure of running her own firm. Mike investigates the note left
                on his car.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/6/6"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 118,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 50px)"
              }}
            >
              <label htmlFor="bookmark-199">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-199" />
              <span>House (S6E6)</span>
              <span className="title">Brave Heart</span>
              <span className="spoiler">
                A dying patient insists that he has the same disease affecting his
                heart that killed his father and grandfather at the age of 40.
                Meanwhile, House discovers that he has a hearing problem while
                trying to duck student rounds.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/3/2"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 52px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 56,
              maxHeight: 118,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 40,
                maxHeight: "calc(var(--scale) * 47px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-200">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-200" />
              <span>Better Call Saul (S3E2)</span>
              <span className="title">Witness</span>
              <span className="spoiler">
                Jimmy and Kim hire an assistant. Mike seeks out a mysterious
                acquaintance. Chuck uses the law to gain an advantage over Jimmy.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/6/7"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-201">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-201" />
              <span>House (S6E7)</span>
              <span className="title">Known Unknowns</span>
              <span className="spoiler">
                After a wild night out, a teenage girl is brought to Princeton
                Plainsborough with severely swollen appendages. The team must work
                to diagnose the young girl, who is less than honest about what
                happened the night she fell ill. As her condition worsens, she
                becomes unable to distinguish fact from fiction. Meanwhile, Cuddy,
                Wilson and House spend a weekend away from the hospital to attend
                a medical conference, but things don’t go as planned when House’s
                private investigator, Lucas returns.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/6/8"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 112,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 44px)"
              }}
            >
              <label htmlFor="bookmark-202">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-202" />
              <span>House (S6E8)</span>
              <span className="title">Teamwork</span>
              <span className="spoiler">
                After House’s medical license is reinstated, he reclaims his role
                as Head of Diagnostics in time to treat Hank Hardwick, an adult
                film star admitted to Princeton Plainsborough for pulsating eye
                pain. Meanwhile, Cuddy is reminded that Princeton Plainsborough is
                not conducive to healthy personal relationships.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/3/3"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 46px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 50,
              maxHeight: 112,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 34,
                maxHeight: "calc(var(--scale) * 41px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-203">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-203" />
              <span>Better Call Saul (S3E3)</span>
              <span className="title">Sunk Costs</span>
              <span className="spoiler">
                Jimmy decides to represent a new client to Kim's dismay. Mike
                meets a formidable ally who gives a tempting offer.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/6/9"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-204">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-204" />
              <span>House (S6E9)</span>
              <span className="title">Ignorance Is Bliss</span>
              <span className="spoiler">
                On the eve of Thanksgiving, House and the team take on the case of
                James Sidas, an exceptionally brilliant physicist and author who
                traded his successful career for a job as a courier. For the
                ailing patient, intelligence is a miserable burden that has
                prompted depression and addiction, and this, coupled with a myriad
                of strange symptoms, nearly stumps the team. Meanwhile the doctors
                at Princeton Plainsboro wrestle with strained personal
                relationships.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/3/4"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-205">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-205" />
              <span>Better Call Saul (S3E4)</span>
              <span className="title">Sabrosito</span>
              <span className="spoiler">
                Jimmy asks a favor of Mike; new complications disrupt Salamancas'
                business. Chuck and Jimmy struggle with a compromise.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/6/10"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 116,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 48px)"
              }}
            >
              <label htmlFor="bookmark-206">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-206" />
              <span>House (S6E10)</span>
              <span className="title">Wilson</span>
              <span className="spoiler">
                When an old friend and former patient of Wilson’s exhibits
                paralysis in his right arm, Wilson puts himself on the case. House
                wagers Wilson that the patient’s symptoms are attributed to new
                cancer cells. Wilson accepts even though he is reluctant to
                believe the cancer has returned. With the help of the team, Wilson
                works to diagnose the patient more optimistic results, but when
                things take a turn for the worse, Wilson must address his
                inability to separate patient from friend. Meanwhile, Cuddy seeks
                advice in her search for real estate.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/3/5"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 50px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 54,
              maxHeight: 116,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 38,
                maxHeight: "calc(var(--scale) * 45px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-207">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-207" />
              <span>Better Call Saul (S3E5)</span>
              <span className="title">Chicanery</span>
              <span className="spoiler">
                Kim and Jimmy face off with an adversary. Jimmy looks to Chuck's
                past to secure his future. Jimmy loses an ally and gains another.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/6/11"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-208">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-208" />
              <span>House (S6E11)</span>
              <span className="title">The Down Low</span>
              <span className="spoiler">
                When drug dealer Mickey mysteriously collapses while negotiating a
                sale, his partner-in-crime, Eddie, accompanies him to Princeton
                Plainsboro for treatment. But with a major deal pending, Mickey is
                not forthcoming with the necessary personal information the team
                needs to treat him. As Mickey's condition worsens, the team
                resorts to old-fashioned detective work to solve the case.
                Meanwhile, House and Wilson compete for the affection of a new
                neighbor, and Chase, Thirteen and Taub attempt to play a practical
                joke on Foreman.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/6/12"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-209">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-209" />
              <span>House (S6E12)</span>
              <span className="title">Remorse</span>
              <span className="spoiler">
                The team takes on the case of Valerie, an attractive female
                executive experiencing random episodes of excruciating pain. House
                agrees to take the case based on Valerie’s looks, and while
                treating her, the men on the team are charmed by Valerie’s beauty
                and personality, with Thirteen looking beyond the superficial to
                try to discover a link to her illness. Meanwhile, House
                uncharacteristically attempts to alleviate his conscience by
                reaching out to a former medical school colleague he wronged.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/3/6"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-210">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-210" />
              <span>Better Call Saul (S3E6)</span>
              <span className="title">Off Brand</span>
              <span className="spoiler">
                Jimmy has a new endeavor. Chuck pushes himself to the limit. Nacho
                finds himself in a power struggle.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/6/13"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 119,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 51px)"
              }}
            >
              <label htmlFor="bookmark-211">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-211" />
              <span>House (S6E13)</span>
              <span className="title">Moving the Chains</span>
              <span className="spoiler">
                House and the team rush to treat an ailing college football star
                in time for the patient to compete in NFL tryouts. But when the
                patient experiences an onslaught of varied and unusual symptoms,
                the team has trouble reaching a consensus on how to effectively
                treat him in time. Meanwhile, Foreman’s brother Marcus makes a
                surprise visit to the hospital.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/3/7"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 53px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 57,
              maxHeight: 119,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 41,
                maxHeight: "calc(var(--scale) * 48px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-212">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-212" />
              <span>Better Call Saul (S3E7)</span>
              <span className="title">Expenses</span>
              <span className="spoiler">
                Jimmy tries to settle debts. Nacho reunites with an acquaintance.
                Mike helps Stacey with a project and makes a connection.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/6/14"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-213">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-213" />
              <span>House (S6E14)</span>
              <span className="title">5 to 9</span>
              <span className="spoiler">
                During a day in the life of Princeton Plainsboro's Dean of
                Medicine, Dr. Lisa Cuddy, the inner workings of the hospital are
                seen through her eyes. This day proves to be especially trying as
                Cuddy wrestles with myriad hospital issues and staff disputes that
                test her perseverance and skills as an administrator, all while
                juggling issues in her personal life.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/6/15"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 115,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 47px)"
              }}
            >
              <label htmlFor="bookmark-214">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-214" />
              <span>House (S6E15)</span>
              <span className="title">Private Lives</span>
              <span className="spoiler">
                House and the team take on the case of an avid blogger admitted
                with sudden bruising and bleeding. From her hospital bed, the
                patient blogs about her symptoms, doctors and prospective
                diagnoses to her dedicated band of followers and solicits their
                advice on a course of treatment. Such openness leads the team to
                contemplate the value of privacy, especially after House and
                Wilson uncover secrets from one another 's past. Meanwhile, Chase
                is coaxed into testing out the dating scene.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/3/8"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 49px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 53,
              maxHeight: 115,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 37,
                maxHeight: "calc(var(--scale) * 44px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-215">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-215" />
              <span>Better Call Saul (S3E8)</span>
              <span className="title">Slip</span>
              <span className="spoiler">
                Jimmy is pushed to desperate measures. Nacho picks up a new skill.
                Mike explores an alliance. Kim stands up to Hamlin.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/6/16"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 116,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 48px)"
              }}
            >
              <label htmlFor="bookmark-216">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-216" />
              <span>House (S6E16)</span>
              <span className="title">Black Hole</span>
              <span className="spoiler">
                The team takes on the case of a high school senior who
                inexplicably blacks out during a class field trip. While in the
                hospital, the patient repeatedly hallucinates. After exhausting
                myriad ineffective treatments for her mysterious ailments, House
                attempts one last controversial approach to diagnosing her:
                monitoring her cognitive patterns and looking for clues.
                Meanwhile, Taub airs his dirty laundry at work, and Wilson
                attempts to furnish his condo.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/3/9"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 50px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 54,
              maxHeight: 116,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 38,
                maxHeight: "calc(var(--scale) * 45px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-217">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-217" />
              <span>Better Call Saul (S3E9)</span>
              <span className="title">Fall</span>
              <span className="spoiler">
                Jimmy visits an old friend and takes up a new pastime. Chuck and
                Hamlin spar over the future of the firm. Kim faces challenges at
                work.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/6/17"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-218">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-218" />
              <span>House (S6E17)</span>
              <span className="title">Lockdown</span>
              <span className="spoiler">
                This episode has five storylines: When the hospital is sent into
                lock-down mode due to a missing infant, all of the doctors must
                remain where they are, leaving Foreman and Taub in the file room,
                Wilson and Thirteen in the cafeteria playing truth or dare, House
                in a room with a patient, and Chase with his soon-to-be ex-wife,
                Cameron, as Cuddy tries to help police locate the infant. This
                episode is one of the show's rare instances when no medical
                mystery is presented, though House still deals with his "patient
                of the week".
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/6/18"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 123,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 55px)"
              }}
            >
              <label htmlFor="bookmark-219">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-219" />
              <span>House (S6E18)</span>
              <span className="title">Knight Fall</span>
              <span className="spoiler">
                House and the team take on the case of Sir William, a "knight" in
                a closed-off community of men and women living according to the
                ideals of the High Renaissance. As the team searches the medieval
                village for environmental factors contributing to Sir William's
                rapidly deteriorating health, Thirteen and Sir William debate the
                acts that define honor and loyalty, especially in regard to the
                "queen" of the community, one of Sir William's most frequent
                visitors. Meanwhile, Wilson starts over with an ex.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker finale"
          data-id="tv/60059/3/10"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 57px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 61,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)",
              maxHeight: 123
            }}
          >
            <div
              style={{
                minHeight: 45,
                maxHeight: "calc(var(--scale) * 52px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-220">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-220" />
              <span>Better Call Saul (S3E10)</span>
              <span className="title">Lantern</span>
              <span className="spoiler">
                Kim takes time off. Jimmy tries to make amends. Nacho gambles with
                his future. Hamlin pushes Chuck to make a decision.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/6/19"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 115,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 47px)"
              }}
            >
              <label htmlFor="bookmark-221">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-221" />
              <span>House (S6E19)</span>
              <span className="title">Open and Shut</span>
              <span className="spoiler">
                House and the team take on the case of a woman Julia, who is in an
                open marriage and becomes ill during a date with her on-the-side
                boyfriend. As perplexing as the case is, Julia's happy and
                healthy, yet polygamous relationship is equally baffling to the
                team. Meanwhile, House tests Wilson's relationship with Sam.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker premier"
          data-id="tv/60059/4/1"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 49px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 53,
              maxHeight: 115,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 37,
                maxHeight: "calc(var(--scale) * 44px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-222">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-222" />
              <span>Better Call Saul (S4E1)</span>
              <span className="title">Smoke</span>
              <span className="spoiler">
                Jimmy struggles to cope with Chuck's tragic death. Mike ponders
                his role at Madrigal. Howard makes a startling confession.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/6/20"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 112,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 44px)"
              }}
            >
              <label htmlFor="bookmark-223">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-223" />
              <span>House (S6E20)</span>
              <span className="title">The Choice</span>
              <span className="spoiler">
                The team takes on the case of an ailing groom-to-be who harbors
                undisclosed secrets from a previous relationship. As his fiancée
                tries to get answers to her many questions, a frustrated team
                winnows down the possibilities. Meanwhile, House spends
                extra-curricular time with his Princeton Plainsboro colleagues,
                performing a karaoke rendition of a Gladys Knight &amp; The Pips
                classic with Foreman and Chase.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/4/2"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 46px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 50,
              maxHeight: 112,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 34,
                maxHeight: "calc(var(--scale) * 41px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-224">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-224" />
              <span>Better Call Saul (S4E2)</span>
              <span className="title">Breathe</span>
              <span className="spoiler">
                Jimmy seeks new employment. Gus navigates the fallout from
                Hector's collapse. Kim endeavors to support Jimmy in the wake of
                Chuck's death.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/6/21"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 111,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 43px)"
              }}
            >
              <label htmlFor="bookmark-225">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-225" />
              <span>House (S6E21)</span>
              <span className="title">Baggage</span>
              <span className="spoiler">
                During a session with Dr. Nolan, House recounts the case of a
                woman who arrives at the Princeton Plainsboro emergency room with
                an unexplained illness and no recollection of who she is. While
                trying to solve the mystery of the woman's illness, House must
                also help her piece together her identity.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker finale odd"
          data-id="tv/1408/6/22"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 45px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 49,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 33,
                maxHeight: "calc(var(--scale) * 40px + var(--height-mult) * 41px)"
              }}
            >
              <label htmlFor="bookmark-226">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-226" />
              <span>House (S6E22)</span>
              <span className="title">Help Me</span>
              <span className="spoiler">
                Cuddy, House and members of the team join forces with a
                search-and-rescue team to provide much-needed medical attention at
                the scene of an emergency.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/4/3"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 43px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 47,
              maxHeight: 107,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 31,
                maxHeight: "calc(var(--scale) * 38px + var(--height-mult) * 40px)"
              }}
            >
              <label htmlFor="bookmark-227">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-227" />
              <span>Better Call Saul (S4E3)</span>
              <span className="title">Something Beautiful</span>
              <span className="spoiler">
                Jimmy puts a risky plan into motion. As alliances shift, Nacho
                finds himself in the crosshairs. Kim contemplates her future.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker premier odd"
          data-id="tv/1408/7/1"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 42px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 46,
              maxHeight: 111,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 30,
                maxHeight: "calc(var(--scale) * 37px + var(--height-mult) * 45px)"
              }}
            >
              <label htmlFor="bookmark-228">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-228" />
              <span>House (S7E1)</span>
              <span className="title">Now What?</span>
              <span className="spoiler">
                House and Cuddy are exploring the ramifications of those feelings
                and attempting to make a real relationship work. Meanwhile, due to
                a colleague's illness, Princeton Plainsboro is left without a
                neurosurgeon on site, threatening the hospital's accreditation as
                a Level 1 Trauma Center. As the team attempts treatment to get
                their sick colleague back to work, they discover there is more to
                the illness than they originally suspected and turn to House for
                direction. Instead, House remains elusive, leaving the team on its
                own.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/4/4"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 47px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 51,
              maxHeight: 113,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 35,
                maxHeight: "calc(var(--scale) * 42px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-229">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-229" />
              <span>Better Call Saul (S4E4)</span>
              <span className="title">Talk</span>
              <span className="spoiler">
                A restless Jimmy embarks on a new endeavor while Mike burns
                bridges. Kim pursues her bliss. Nacho tries to survive a turf war.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/7/2"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 119,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 51px)"
              }}
            >
              <label htmlFor="bookmark-230">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-230" />
              <span>House (S7E2)</span>
              <span className="title">Selfish</span>
              <span className="spoiler">
                A seemingly healthy 14-year-old girl collapses during a
                skateboarding exhibition; House and Cuddy face the challenge of
                handling their romantic relationship at work.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/4/5"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 53px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 57,
              maxHeight: 119,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 41,
                maxHeight: "calc(var(--scale) * 48px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-231">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-231" />
              <span>Better Call Saul (S4E5)</span>
              <span className="title">Quite a Ride</span>
              <span className="spoiler">
                Jimmy identifies a new market for his talents. Mike vets a
                potential partnership. Kim drives a hard bargain.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/7/3"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-232">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-232" />
              <span>House (S7E3)</span>
              <span className="title">Unwritten</span>
              <span className="spoiler">
                A children's novelist tries to kill herself, but is thwarted when
                she has a seizure. House, a fan of the books, puts her on psych
                hold but has to deal with a patient that is eager to die rather
                than be cured. Meanwhile, House worries that he'll lose Cuddy
                because they have nothing in common.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/7/4"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-233">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-233" />
              <span>House (S7E4)</span>
              <span className="title">Massage Therapy</span>
              <span className="spoiler">
                House and his team make unexpected discoveries about a female
                patient admitted to the hospital after severe and uncontrollable
                vomiting; House and Cuddy are forced to face the reservations in
                their relationship after a visit from a massage therapist.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/4/6"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-234">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-234" />
              <span>Better Call Saul (S4E6)</span>
              <span className="title">Piñata</span>
              <span className="spoiler">
                While Jimmy dreams of Wexler-McGill, Kim makes a bold move. Mike
                puts a plan into motion for Gus.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/7/5"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 108,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 40px)"
              }}
            >
              <label htmlFor="bookmark-235">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-235" />
              <span>House (S7E5)</span>
              <span className="title">Unplanned Parenthood</span>
              <span className="spoiler">
                When an infant suffers breathing trouble and liver failure, House
                and the team must look at the medical history of the mother in
                order to find an answer, and ultimately land on a discovery that
                forces the mother to jeopardize not only her child's health but
                her own. Meanwhile Taub and Foreman must find a new female doctor
                to fill the spot vacated by Thirteen and House and Wilson learn a
                thing or two about parenting while caring for Cuddy's daughter.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/4/7"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 42px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 46,
              maxHeight: 108,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 30,
                maxHeight: "calc(var(--scale) * 37px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-236">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-236" />
              <span>Better Call Saul (S4E7)</span>
              <span className="title">Something Stupid</span>
              <span className="spoiler">
                Jimmy expands his business, but runs into a problem that only Kim
                can solve. Gus intervenes in Hector's medical care. Mike deals
                with a setback.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/7/6"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 119,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 51px)"
              }}
            >
              <label htmlFor="bookmark-237">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-237" />
              <span>House (S7E6)</span>
              <span className="title">Office Politics</span>
              <span className="spoiler">
                It’s election season, and in the midst of a tight campaign, an
                incumbent New Jersey senator’s campaign manager falls ill with
                liver failure and temporary paralysis. Cuddy pushes House to add a
                female doctor to his team by hiring brilliant third-year medical
                student Martha Masters in Thirteen’s absence.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/4/8"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 53px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 57,
              maxHeight: 119,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 41,
                maxHeight: "calc(var(--scale) * 48px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-238">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-238" />
              <span>Better Call Saul (S4E8)</span>
              <span className="title">Coushatta</span>
              <span className="spoiler">
                Jimmy goes to great lengths to right a wrong, as Kim pulls out all
                the stops for a case. Mike lets his team blow off steam. Nacho
                receives a visitor.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/7/7"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-239">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-239" />
              <span>House (S7E7)</span>
              <span className="title">A Pox on Our House</span>
              <span className="spoiler">
                After a 200-year-old medicine jar found on an off-shore shipwreck
                shatters in a teenage girl's palm, she is admitted to Princeton
                Plainsboro for symptoms closely linked to smallpox.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/7/8"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 121,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 53px)"
              }}
            >
              <label htmlFor="bookmark-240">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-240" />
              <span>House (S7E8)</span>
              <span className="title">Small Sacrifices</span>
              <span className="spoiler">
                Science and faith are called into question when a patient is
                admitted to the hospital following his reenactment of the
                Crucifixion. Meanwhile, Taub questions his wife about her
                relationship with an infidelity support group member, and the team
                attends a co-worker's wedding.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/4/9"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 55px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 59,
              maxHeight: 121,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 43,
                maxHeight: "calc(var(--scale) * 50px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-241">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-241" />
              <span>Better Call Saul (S4E9)</span>
              <span className="title">Wiedersehen</span>
              <span className="spoiler">
                Jimmy and Kim unburden themselves, risking their relationship in
                the process. Nacho is forced to make the rounds with Lalo. Mike
                has cause to worry.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/7/9"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 127,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 59px)"
              }}
            >
              <label htmlFor="bookmark-242">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-242" />
              <span>House (S7E9)</span>
              <span className="title">Larger Than Life</span>
              <span className="spoiler">
                After saving a stranger who fell onto subway tracks, a man
                suddenly collapses despite appearing to be unscathed; House tries
                to avoid a dinner with Cuddy and her opinionated mother.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker finale"
          data-id="tv/60059/4/10"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 61px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 65,
              maxHeight: 127,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 49,
                maxHeight: "calc(var(--scale) * 56px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-243">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-243" />
              <span>Better Call Saul (S4E10)</span>
              <span className="title">Winner</span>
              <span className="spoiler">
                Jimmy turns the page on his reputation. Lalo tracks a loose end in
                Gus' operation. Mike is forced to make a difficult decision.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/7/10"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-244">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-244" />
              <span>House (S7E10)</span>
              <span className="title">Carrot or Stick</span>
              <span className="spoiler">
                House and the team try to link symptoms of a teenage military
                recruit and his drill sergeant, while House secretly helps Cuddy's
                daughter get into a prestigious preschool. Someone posted a
                disparaging photo of Chase on a social-networking site.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/7/11"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 121,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 53px)"
              }}
            >
              <label htmlFor="bookmark-245">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-245" />
              <span>House (S7E11)</span>
              <span className="title">Family Practice</span>
              <span className="spoiler">
                Cuddy’s mother, Arlene, is admitted to Princeton Plansboro after
                complaining about unusual symptoms, but stubborn Arlene insists
                that House be removed from the case, forcing House to come up with
                non-conventional means to treat his patient.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker premier"
          data-id="tv/60059/5/1"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 55px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 59,
              maxHeight: 121,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 43,
                maxHeight: "calc(var(--scale) * 50px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-246">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-246" />
              <span>Better Call Saul (S5E1)</span>
              <span className="title">Magic Man</span>
              <span className="spoiler">
                Now doing business as Saul Goodman, Jimmy unveils an unorthodox
                strategy for client development that tests Kim's tolerance of his
                new legal persona. Lalo searches for the mysterious Michael, only
                to discover a problem within his own operation.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/7/12"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-247">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-247" />
              <span>House (S7E12)</span>
              <span className="title">You Must Remember This</span>
              <span className="spoiler">
                When a waitress with a perfect memory suffers temporary paralysis,
                her older sister visits her in the hospital, which triggers high
                stress levels and even more health complications.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/7/13"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 112,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 44px)"
              }}
            >
              <label htmlFor="bookmark-248">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-248" />
              <span>House (S7E13)</span>
              <span className="title">Two Stories</span>
              <span className="spoiler">
                House participates in a school’s Career Day and breaks a few rules
                by sharing explicit medical stories. Waiting outside the
                principal’s office, he meets two fifth-grade students who assess
                House’s relationship woes and try to help him understand how his
                selfish antics get in the way of showing Cuddy how he really
                feels.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/5/2"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 46px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 50,
              maxHeight: 112,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 34,
                maxHeight: "calc(var(--scale) * 41px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-249">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-249" />
              <span>Better Call Saul (S5E2)</span>
              <span className="title">50% Off</span>
              <span className="spoiler">
                Jimmy's promotional stunt has unintended consequences. Nacho takes
                extreme measures to earn Lalo's trust. Saul is a success at the
                courthouse but still has yet to win Kim over. Simmering with rage
                and self-loathing, Mike loses his temper.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/7/14"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 121,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 53px)"
              }}
            >
              <label htmlFor="bookmark-250">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-250" />
              <span>House (S7E14)</span>
              <span className="title">Recession Proof</span>
              <span className="spoiler">
                A patient is admitted after breaking out in a severe rash
                triggered by caustic chemical exposure at his blue-collar job.
                Meanwhile, Cuddy is honored with an award and needs House to be at
                the charity event for support, but his attendance is threatened
                when his patient’s battle to survive forces him to question his
                practice and his own happiness.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/5/3"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 55px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 59,
              maxHeight: 121,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 43,
                maxHeight: "calc(var(--scale) * 50px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-251">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-251" />
              <span>Better Call Saul (S5E3)</span>
              <span className="title">The Guy for This</span>
              <span className="spoiler">
                Jimmy's business enters uncharted territory. Kim's confidence is
                tested when she's faced with a legal problem only she can solve.
                Nacho navigates increased pressure from Gus. Mike continues to
                spiral.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/7/15"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 113,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 45px)"
              }}
            >
              <label htmlFor="bookmark-252">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-252" />
              <span>House (S7E15)</span>
              <span className="title">Bombshells</span>
              <span className="spoiler">
                Tension reaches new heights when Cuddy faces sobering news that
                propels her to reevaluate her priorities. While House is
                distracted by his concern for Cuddy’s well-being, the team treats
                a teenage patient whose worsening symptoms and suspicious body
                scars indicate more than just physical illness.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/5/4"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 47px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 51,
              maxHeight: 113,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 35,
                maxHeight: "calc(var(--scale) * 42px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-253">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-253" />
              <span>Better Call Saul (S5E4)</span>
              <span className="title">Namaste</span>
              <span className="spoiler">
                As Jimmy doubles down on Saul Goodman, a deeply conflicted Kim
                brings him an interesting proposition, Gus makes a sacrifice in
                order to play the long game, and Mike attempts to smooth things
                over with his family.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/7/16"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-254">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-254" />
              <span>House (S7E16)</span>
              <span className="title">Out of the Chute</span>
              <span className="spoiler">
                The team treats a professional bull rider who is attacked by a
                bull. The team must determine the causes behind the patients
                disappearing symptoms and seizures while taking House's advice
                from outside the hospital as he attends to issues unrelated to the
                case. Meanwhile, Masters develops a crush on the patient.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/7/17"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 117,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 49px)"
              }}
            >
              <label htmlFor="bookmark-255">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-255" />
              <span>House (S7E17)</span>
              <span className="title">Fall from Grace</span>
              <span className="spoiler">
                A homeless man with a history of drug abuse is admitted to
                Princeton Plainsboro with burns and scars on his chest. Meanwhile,
                Cuddy reveals her guilt to Wilson about breaking up with House.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/5/5"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 51px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 55,
              maxHeight: 117,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 39,
                maxHeight: "calc(var(--scale) * 46px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-256">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-256" />
              <span>Better Call Saul (S5E5)</span>
              <span className="title">Dedicado a Max</span>
              <span className="spoiler">
                Mike takes an impromptu trip out of town. As she and Jimmy grow
                closer over their campaign to help a client, Kim makes a
                surprising call.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/7/18"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 118,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 50px)"
              }}
            >
              <label htmlFor="bookmark-257">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-257" />
              <span>House (S7E18)</span>
              <span className="title">The Dig</span>
              <span className="spoiler">
                Thirteen has been in prison for the past year, but the real
                mystery for House is what she did to get there. At the hospital,
                the team treats a science teacher suffering from severe
                respiratory illness. Taub tries to get back into the dating scene,
                but winds up retreating to his old habits.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/5/6"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 52px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 56,
              maxHeight: 118,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 40,
                maxHeight: "calc(var(--scale) * 47px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-258">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-258" />
              <span>Better Call Saul (S5E6)</span>
              <span className="title">Wexler v. Goodman</span>
              <span className="spoiler">
                Kim tries to pump the brakes on Jimmy's latest scheme, but it may
                be too late to stop Saul. Mike turns the heat up on Lalo. Nacho
                attempts to enlist support from above.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/7/19"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-259">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-259" />
              <span>House (S7E19)</span>
              <span className="title">Last Temptation</span>
              <span className="spoiler">
                Masters faces a career crossroads on her last day as a medical
                student and struggles with the choice to continue on the path to
                become a surgeon or to accept the rare opportunity to join House’s
                team officially. Meanwhile, the team treats a 16-year-old girl who
                inexplicably collapsed days before embarking on an ambitious
                sailing tour around the globe. Despite the patient's life-changing
                diagnosis, the patient's family insists on getting her back on the
                seas in time for her potentially record-breaking launch. But to
                the team's surprise, including House, Masters makes a bold
                decision regarding the patient’s treatment.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/7/20"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 46px)"
              }}
            >
              <label htmlFor="bookmark-260">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-260" />
              <span>House (S7E20)</span>
              <span className="title">Changes</span>
              <span className="spoiler">
                The team takes on the case of a lottery winner (Donal Logue)
                suffering from paralysis and multiple types of cancer, and they
                must figure out if it his new millionaire lifestyle that is making
                him sick. Meanwhile, Cuddy's mother threatens to sue the hospital
                over her treatment, and Foreman and Chase make a bet over who is
                repressing the uglier side of their personality more.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/5/7"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 48px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 52,
              maxHeight: 114,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 36,
                maxHeight: "calc(var(--scale) * 43px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-261">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-261" />
              <span>Better Call Saul (S5E7)</span>
              <span className="title">JMM</span>
              <span className="spoiler">
                Jimmy and Kim build a legal firewall with help from Huell. Kim
                sets things straight with her clients as Jimmy is compromised by
                his. Gus, at war on all fronts, calms troubled waters in service
                of his plot to build an empire. Mike does damage control.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/7/21"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 121,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 53px)"
              }}
            >
              <label htmlFor="bookmark-262">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-262" />
              <span>House (S7E21)</span>
              <span className="title">The Fix</span>
              <span className="spoiler">
                After losing a bet with Wilson over a boxing match, House is
                convinced that his fighter has an underlying medical condition
                that cost him the fight. While he tries to prove it, he leaves his
                team alone to help a bomb scientist who suffered a seizure.
                Meanwhile, House may be experimenting with a new drug to help his
                leg pain.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/5/8"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 55px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 59,
              maxHeight: 121,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 43,
                maxHeight: "calc(var(--scale) * 50px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-263">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-263" />
              <span>Better Call Saul (S5E8)</span>
              <span className="title">Bagman</span>
              <span className="spoiler">
                When a simple errand for a client goes sideways, Jimmy is pushed
                to the limit. Mike takes measures to contain the wrath of the
                cartel. Lalo gets an unexpected visitor.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/7/22"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-264">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-264" />
              <span>House (S7E22)</span>
              <span className="title">After Hours</span>
              <span className="spoiler">
                When House discovers that the experimental drug he's been using
                causes fatal tumors, he decides to attempt to excise them himself.
                However, he can't complete the surgery and ends up needing Cuddy's
                help. Meanwhile, Thirteen's friend from prison (Amy Landecker), a
                relapsed drug user, arrives at her apartment needing medical care
                after being stabbed. With her friend unwilling to go to the
                hospital, Thirteen enlists Chase's assistance when the friend
                loses sensation and movement in her arm. Also, Taub receives some
                unexpected news that could change his life.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker finale odd"
          data-id="tv/1408/7/23"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 126,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 58px)"
              }}
            >
              <label htmlFor="bookmark-265">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-265" />
              <span>House (S7E23)</span>
              <span className="title">Moving On</span>
              <span className="spoiler">
                The team treats a performance artist (Shohreh Aghdashloo) who
                deliberately made herself ill with the aim of turning the
                diagnostics department into her new masterpiece, as House must
                decide which of her symptoms are real, and which are
                self-inflicted. As the case progresses, House vows to make changes
                in his life, but remains rooted in old habits. After the case is
                over, House finally deals with his anger over the breakup and
                lashes out by driving through Cuddy's dining room and escaping to
                a beach.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/5/9"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 60px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 64,
              maxHeight: 126,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 48,
                maxHeight: "calc(var(--scale) * 55px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-266">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-266" />
              <span>Better Call Saul (S5E9)</span>
              <span className="title">Bad Choice Road</span>
              <span className="spoiler">
                In the wake of Jimmy's traumatic misadventure, Kim takes stock of
                what is important. Jimmy attempts to return to business as usual,
                but it's more difficult than anticipated. Gus and Mike set a plan
                in motion.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker premier odd"
          data-id="tv/1408/8/1"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 127,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 59px)"
              }}
            >
              <label htmlFor="bookmark-267">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-267" />
              <span>House (S8E1)</span>
              <span className="title">Twenty Vicodin</span>
              <span className="spoiler">
                House is serving out a lengthy prison sentence for his various
                misdeeds, including his trip outside the country in an attempt to
                escape responsibility. Entirely cut off from his old life, House
                determines his current problems are the result of his inability to
                deal with people. Feeling he will never be able to practice
                medicine again, he plans instead to go back to university to earn
                a doctorate in physics - a field that will all but assure his
                isolation from other human beings.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker finale"
          data-id="tv/60059/5/10"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 61px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 65,
              maxHeight: 127,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 49,
                maxHeight: "calc(var(--scale) * 56px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-268">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-268" />
              <span>Better Call Saul (S5E10)</span>
              <span className="title">Something Unforgivable</span>
              <span className="spoiler">
                Jimmy and Kim make a sideways move that takes a serious turn.
                Nacho gets closer to the cartel than he'd like. Season Finale.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/8/2"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-269">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-269" />
              <span>House (S8E2)</span>
              <span className="title">Transplant</span>
              <span className="spoiler">
                A surprising visitor makes House an offer he can't refuse by
                giving him the opportunity to help the Princeton Plainsboro team
                treat a unique patient in order to save the life of an organ
                recipient being treated by Wilson. Although House finds himself
                back on familiar ground, he quickly realizes that much has changed
                since he left, and he is forced to work on the case with smart yet
                timid resident Dr. Chi Park. After several inconclusive treatments
                and with time running out, House and Dr. Park are left with one
                last option to examine the patient's medical history that could
                compromise House's conditional agreement with the hospital.
                Meanwhile, House makes an effort to reconnect with Wilson despite
                a cold reception.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/8/3"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 122,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 54px)"
              }}
            >
              <label htmlFor="bookmark-270">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-270" />
              <span>House (S8E3)</span>
              <span className="title">Charity Case</span>
              <span className="spoiler">
                House and Park treat a patient, Benjamin, who collapsed after
                making a surprisingly large charity donation, and come to suspect
                that the altruistic behavior is a symptom of a deeper disorder.
                When the patient offers to donate an organ for another patient,
                the doctors must convince Dr. Adams to help them confirm whether
                Benjamin is in his right mind or not.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker premier"
          data-id="tv/60059/6/1"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 56px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 60,
              maxHeight: 122,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 44,
                maxHeight: "calc(var(--scale) * 51px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-271">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-271" />
              <span>Better Call Saul (S6E1)</span>
              <span className="title">Wine and Roses</span>
              <span className="spoiler">
                Nacho runs for his life. Jimmy and Kim hatch a plan. Mike
                questions his allegiances.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/8/4"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-272">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-272" />
              <span>House (S8E4)</span>
              <span className="title">Risky Business</span>
              <span className="spoiler">
                A CEO falls mysteriously ill just days before he signs a contract
                that would relocate his company's entire labor force to China.
                House attempts to make an underhanded business transaction with
                his wealthy patient, but when the patient's condition worsens, the
                team must work around the clock to save his life. Meanwhile, Park
                prepares for her hearing with the Princeton Plainsboro
                Disciplinary Committee chaired by Foreman, and Adams' outlook on
                her patient's business venture reveals her deeper feelings about
                loyalty.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/8/5"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 126,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 58px)"
              }}
            >
              <label htmlFor="bookmark-273">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-273" />
              <span>House (S8E5)</span>
              <span className="title">The Confession</span>
              <span className="spoiler">
                A man well-respected in his community suddenly collapses, and in
                the process of diagnosing his symptoms, the team discovers that
                the patient has been hiding dark and dishonest secrets about his
                personal and professional life. But when the patient openly
                confesses his wrongdoings to his family and community, he
                compromises his chances of receiving the proper medical treatment.
                Meanwhile, House will stop at nothing to manipulate Taub into
                taking a DNA test to prove he is the father of his two
                six-month-old daughters.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/6/2"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 60px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 64,
              maxHeight: 126,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 48,
                maxHeight: "calc(var(--scale) * 55px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-274">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-274" />
              <span>Better Call Saul (S6E2)</span>
              <span className="title">Carrot and Stick</span>
              <span className="spoiler">
                Harsh realities dawn on Nacho. Gus investigates his suspicions.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/8/6"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 113,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 45px)"
              }}
            >
              <label htmlFor="bookmark-275">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-275" />
              <span>House (S8E6)</span>
              <span className="title">Parents</span>
              <span className="spoiler">
                A teenage boy attempting to follow in his late father’s footsteps
                as an entertainer is admitted to Princeton Plainsboro with partial
                paralysis. As the team searches for a bone marrow match, they
                uncover a disturbing family secret. Meanwhile, House looks for
                creative ways to remove his ankle monitor so that he can attend a
                boxing match in Atlantic City, and he treats a patient who is
                convinced he is suffering from diabetes. Also, Taub faces a tough
                decision when his ex-wife Rachel tells him that she wants to move
                across the country with their infant daughter.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/6/3"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 47px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 51,
              maxHeight: 113,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 35,
                maxHeight: "calc(var(--scale) * 42px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-276">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-276" />
              <span>Better Call Saul (S6E3)</span>
              <span className="title">Rock and Hard Place</span>
              <span className="spoiler">
                Still on the run, Nacho is forced to choose where his loyalties
                lie. Jimmy doubles down.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/8/7"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 111,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 43px)"
              }}
            >
              <label htmlFor="bookmark-277">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-277" />
              <span>House (S8E7)</span>
              <span className="title">Dead &amp; Buried</span>
              <span className="spoiler">
                The team learns that their 14-year-old patient is suffering from
                more than teen angst when her physical symptoms worsen. Despite
                Foreman’s firm opposition, House becomes obsessed with solving a
                peculiar case of a deceased four-year-old patient, which gets him
                into serious trouble. Meanwhile, Park tries to get Chase to admit
                the reason behind his recent obsession with grooming.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/6/4"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 45px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 49,
              maxHeight: 111,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 33,
                maxHeight: "calc(var(--scale) * 40px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-278">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-278" />
              <span>Better Call Saul (S6E4)</span>
              <span className="title">Hit and Run</span>
              <span className="spoiler">
                Gus takes extreme measures. Jimmy and Kim enlist a local pro to
                put on a show.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/8/8"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-279">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-279" />
              <span>House (S8E8)</span>
              <span className="title">Perils of Paranoia</span>
              <span className="spoiler">
                A prosecutor suffers from what he believes to be cardiac arrest
                during an interrogation at the witness stand. The team's
                preliminary diagnosis is hyper-anxiety, but when Adams and Park
                investigate the patient's home and find a hidden arsenal of
                firearms, they uncover a more alarming and deep-seated
                psychological disorder.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/8/9"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 118,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 50px)"
              }}
            >
              <label htmlFor="bookmark-280">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-280" />
              <span>House (S8E9)</span>
              <span className="title">Better Half</span>
              <span className="spoiler">
                House and his team treat an Alzheimer's patient who vomits blood
                and flies into violent rages. Meanwhile, when Wilson tells House
                about a patient who has never had sex with her husband of 10
                years, claiming A-sexuality, House makes a wager with him that
                there has to be an underlying cause.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/6/5"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 52px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 56,
              maxHeight: 118,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 40,
                maxHeight: "calc(var(--scale) * 47px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-281">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-281" />
              <span>Better Call Saul (S6E5)</span>
              <span className="title">Black and Blue</span>
              <span className="spoiler">
                While business booms for Jimmy, the vise tightens on the
                cat-and-mouse game between Gus and Lalo.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/8/10"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 111,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 43px)"
              }}
            >
              <label htmlFor="bookmark-282">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-282" />
              <span>House (S8E10)</span>
              <span className="title">Runaways</span>
              <span className="spoiler">
                When a runaway teen requires hospitalization, Adams butts heads
                with House when she insists they contact Social Services.
                Meanwhile, Taub has trouble forming a personal connection with his
                baby daughters and Foreman's relationship with a married woman
                comes out.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/6/6"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 45px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 49,
              maxHeight: 111,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 33,
                maxHeight: "calc(var(--scale) * 40px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-283">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-283" />
              <span>Better Call Saul (S6E6)</span>
              <span className="title">Axe and Grind</span>
              <span className="spoiler">
                Kim and Jimmy enlist a knowledgeable contact. Howard scrutinizes
                Jimmy’s business practices.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/8/11"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-284">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-284" />
              <span>House (S8E11)</span>
              <span className="title">Nobody's Fault</span>
              <span className="spoiler">
                House and his team are placed under review after a staff member
                gets hurt.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/8/12"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 117,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 49px)"
              }}
            >
              <label htmlFor="bookmark-285">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-285" />
              <span>House (S8E12)</span>
              <span className="title">Chase</span>
              <span className="spoiler">
                Chase's religious faith bubbles to the surface when he treats a
                young nun. In addition, he and House reach a fundamental
                disagreement about the patient that may finally end Chase's
                reputation as House's "yes man" but also bring's House's methods,
                reputation and objectivity are given more serious scrutiny.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/6/7"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 51px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 55,
              maxHeight: 117,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 39,
                maxHeight: "calc(var(--scale) * 46px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-286">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-286" />
              <span>Better Call Saul (S6E7)</span>
              <span className="title">Plan and Execution</span>
              <span className="spoiler">
                Jimmy and Kim deal with a last-minute snag. Howard's investigation
                finally yields results.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/8/13"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 116,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 48px)"
              }}
            >
              <label htmlFor="bookmark-287">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-287" />
              <span>House (S8E13)</span>
              <span className="title">Man of the House</span>
              <span className="spoiler">
                House's green-card wife, Dominika, will return in order to prove
                to the proper authorities that she and House are actually married.
                This in turn will lead to a crash course in which both will learn
                a little something about love and marriage.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/6/8"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 50px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 54,
              maxHeight: 116,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 38,
                maxHeight: "calc(var(--scale) * 45px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-288">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-288" />
              <span>Better Call Saul (S6E8)</span>
              <span className="title">Point and Shoot</span>
              <span className="spoiler">
                An unexpected visitor forces Jimmy and Kim to face the
                consequences of their actions.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/8/14"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 123,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 55px)"
              }}
            >
              <label htmlFor="bookmark-289">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-289" />
              <span>House (S8E14)</span>
              <span className="title">Love Is Blind</span>
              <span className="spoiler">
                A successful, independent blind man is struck down with a
                mysterious illness, just prior to him asking for his girlfriend's
                hand in marriage. Meanwhile, House has a family member visit to
                inform him of a life change. "Love Is Blind" is the fourteenth
                episode of season eight of House and the 169th overall. The
                episode debuted in Canada on Global on February 27, 2012, and
                aired three weeks later in the United States on Fox on March 19,
                2012. The unusual three-week delay was a byproduct of the 2012
                Daytona 500 rain delay of 30 hours.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/6/9"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 57px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 61,
              maxHeight: 122,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 45,
                maxHeight: "calc(var(--scale) * 52px + var(--height-mult) * 41px)"
              }}
            >
              <label htmlFor="bookmark-290">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-290" />
              <span>Better Call Saul (S6E9)</span>
              <span className="title">Fun and Games</span>
              <span className="spoiler">
                Gus attempts to smooth things over with the cartel while Mike ties
                up loose ends.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/8/15"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 43px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 47,
              maxHeight: 109,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 31,
                maxHeight: "calc(var(--scale) * 38px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-291">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-291" />
              <span>House (S8E15)</span>
              <span className="title">Blowing the Whistle</span>
              <span className="spoiler">
                The team treats an Army veteran charged with treason after he
                leaked classified information. But the patient's life is put at
                risk when he refuses treatment unless he and his brother are given
                information about their late father, a war veteran, which raises
                questions about loyalty to one's family and country. Meanwhile,
                Adams suspects House may be sick, so she recruits Wilson and the
                other team members to plan an intervention and investigate his
                illness.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/8/16"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 118,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 50px)"
              }}
            >
              <label htmlFor="bookmark-292">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-292" />
              <span>House (S8E16)</span>
              <span className="title">Gut Check</span>
              <span className="spoiler">
                House and the team take on the case of a 22-year-old minor league
                hockey player who collapsed while coughing up blood after a fight
                on the ice. Meanwhile, House drops a bomb on Wilson, and Chase
                offers to help Park change her living arrangement.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/6/10"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 52px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 56,
              maxHeight: 118,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 40,
                maxHeight: "calc(var(--scale) * 47px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-293">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-293" />
              <span>Better Call Saul (S6E10)</span>
              <span className="title">Nippy</span>
              <span className="spoiler">
                A lost dog leads to a new friend. A new player gets in the game.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/8/17"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-294">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-294" />
              <span>House (S8E17)</span>
              <span className="title">We Need the Eggs</span>
              <span className="spoiler">
                House and the team take on the case of a man who starts tearing
                blood. Meanwhile, House is interviewing for a new favorite hooker,
                since his current favorite, Emily, has decided to get married and
                leave the business. Desperate for Emily "companionship," House
                teams up with his "wife" Dominika to sabotage Emily's budding
                relationship.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/8/18"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 124,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 56px)"
              }}
            >
              <label htmlFor="bookmark-295">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-295" />
              <span>House (S8E18)</span>
              <span className="title">Body and Soul</span>
              <span className="spoiler">
                House and the team take on the case of a young boy who has violent
                dreams of being choked, and then wakes up but still can't take in
                air. Meanwhile, Park is having intimate dreams involving
                co-workers, which causes the team to question whether or not
                there's significance to what each of them dreams. Dominika
                discovers House has been keeping a secret from her and Wilson
                drops a bombshell on him.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/6/11"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 58px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 62,
              maxHeight: 124,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 46,
                maxHeight: "calc(var(--scale) * 53px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-296">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-296" />
              <span>Better Call Saul (S6E11)</span>
              <span className="title">Breaking Bad</span>
              <span className="spoiler">
                Emboldened by recent successes, partners throw caution to the wind
                and escalate their enterprise to new levels.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/8/19"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 125,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 57px)"
              }}
            >
              <label htmlFor="bookmark-297">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-297" />
              <span>House (S8E19)</span>
              <span className="title">The C-Word</span>
              <span className="spoiler">
                When House and Wilson disappear off the grid for several days,
                without explanation, the team is left to deal with a difficult
                case concerning a 6-year old with numerous problems and
                complications, including an overbearing mother who also happens to
                be her physician.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker"
          data-id="tv/60059/6/12"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 59px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 63,
              maxHeight: 125,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 47,
                maxHeight: "calc(var(--scale) * 54px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-298">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-298" />
              <span>Better Call Saul (S6E12)</span>
              <span className="title">Waterworks</span>
              <span className="spoiler">
                The stakes are raised when a discovery is made that will send
                shockwaves far and wide.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/8/20"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 48,
              maxHeight: 110,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-299">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-299" />
              <span>House (S8E20)</span>
              <span className="title">Post Mortem</span>
              <span className="spoiler">
                Over the years, during the course of performing autopsies at
                Princeton-Plainsboro, Dr. Peter Treiber has often identified
                mistakes made by physicians that caused the patient's death. These
                observations have left him questioning the skills of nearly all
                the doctors on staff... all, that is, except House. When he falls
                ill, he demands that only House make medical decisions concerning
                his care. Unfortunately, House and Wilson have taken off on an
                impromptu road trip without telling anyone, leaving the team to
                fend alone and lie to their patient to make him believe that House
                is the guy calling all the shots.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker odd"
          data-id="tv/1408/8/21"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              maxHeight: 136,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 68px)"
              }}
            >
              <label htmlFor="bookmark-300">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-300" />
              <span>House (S8E21)</span>
              <span className="title">Holding On</span>
              <span className="spoiler">
                The team takes on the case of Derrick, a 19-year-old college
                student who had a mysterious nose bleed during cheerleading
                practice, and discovers that his health issues are likely both
                physiological and psychological. Possibly suffering from
                schizophrenia, Derrick claims to hear his deceased brother’s voice
                in his head. Meanwhile, Foreman tries a different approach with
                House.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker finale"
          data-id="tv/60059/6/13"
          data-title="Better Call Saul"
          style={{
            height: "calc(var(--scale) * 70px)",
            marginLeft: 4,
            backgroundColor: "rgb(0, 191, 64)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail odd"
            style={{
              minHeight: 74,
              maxHeight: 136,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)"
            }}
          >
            <div
              style={{
                minHeight: 58,
                maxHeight: "calc(var(--scale) * 65px + var(--height-mult) * 42px)"
              }}
            >
              <label htmlFor="bookmark-301">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-301" />
              <span>Better Call Saul (S6E13)</span>
              <span className="title">Saul Gone</span>
              <span className="spoiler">
                Revelations. Regrets. RICO violations. Jimmy's worlds — and
                identities — converge in one final showdown.
              </span>
            </div>
          </div>
        </div>
        <div
          className="episode-marker finale odd"
          data-id="tv/1408/8/22"
          data-title="House"
          style={{
            height: "calc(var(--scale) * 44px)",
            marginLeft: 34,
            backgroundColor: "rgb(159, 0, 191)",
            marginTop: "calc(var(--scale) * 30px / 2)",
            marginBottom: "calc(var(--scale) * 30px / 2)"
          }}
        >
          <div
            className="episode-detail"
            style={{
              minHeight: 48,
              width:
                "calc(50% * var(--scale) - 2 * var(--layer-size) * var(--scale) - 5px)",
              maxHeight: 82
            }}
          >
            <div
              style={{
                minHeight: 32,
                maxHeight: "calc(var(--scale) * 39px + var(--height-mult) * 38px)"
              }}
            >
              <label htmlFor="bookmark-302">
                <i className="fa-regular fa-bookmark" aria-hidden="true"></i>
              </label>
              <input type="checkbox" id="bookmark-302" />
              <span>House (S8E22)</span>
              <span className="title">Everybody Dies</span>
              <span className="spoiler">
                Facing a 6-month jail term, and the realization that he won't be
                there for Wilson at the end, House finds himself examining his
                entire life while contemplating a dismal future without his best
                friend.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}