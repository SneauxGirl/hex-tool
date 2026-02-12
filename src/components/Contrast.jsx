import { useState } from 'react';
import Card from './shared/Card';
import {
  contrastRatio,
  getIdealContrast,
  hexToRgb,
  rgbToHex,
  clamp
} from '../utils/colorUtils';
import { WCAG_LEVELS } from '../utils/constants';

function Contrast({ hex, t }) {
  const fullHex = `#${hex}`;
  const initialContrast = getIdealContrast(fullHex);

  const [contrastHex, setContrastHex] = useState(initialContrast);
  const [referenceContrastHex, setReferenceContrastHex] =
    useState(initialContrast);
  const [history, setHistory] = useState([initialContrast]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [appliedOptions, setAppliedOptions] = useState(new Set());

  // === RATIOS ===
  const liveRatio = contrastRatio(
    hexToRgb(fullHex),
    hexToRgb(contrastHex)
  );

  const referenceRatio = contrastRatio(
    hexToRgb(fullHex),
    hexToRgb(referenceContrastHex)
  );

  const passesRefAA =
    referenceRatio >= WCAG_LEVELS.AA_NORMAL.ratio;
  const passesRefAAA =
    referenceRatio >= WCAG_LEVELS.AAA_NORMAL.ratio;

  // === HELPERS ===
  const findClosestLighter = (targetRatio, referenceHex) => {
    const baseRgb = hexToRgb(fullHex);
    const contrastRgb = hexToRgb(referenceHex);

    let testRgb = { ...contrastRgb };
    for (let i = 1; i < 255; i++) {
      testRgb.r = clamp(contrastRgb.r + i);
      testRgb.g = clamp(contrastRgb.g + i);
      testRgb.b = clamp(contrastRgb.b + i);

      const testRatio = contrastRatio(baseRgb, testRgb);
      const testHex = rgbToHex(
        testRgb.r,
        testRgb.g,
        testRgb.b
      );

      if (
        testHex.toUpperCase() !==
          referenceHex.toUpperCase() &&
        testRatio >= targetRatio
      ) {
        return testHex;
      }
    }
    return null;
  };

  const findClosestDarker = (targetRatio, referenceHex) => {
    const baseRgb = hexToRgb(fullHex);
    const contrastRgb = hexToRgb(referenceHex);

    let testRgb = { ...contrastRgb };
    for (let i = 1; i < 255; i++) {
      testRgb.r = clamp(contrastRgb.r - i);
      testRgb.g = clamp(contrastRgb.g - i);
      testRgb.b = clamp(contrastRgb.b - i);

      const testRatio = contrastRatio(baseRgb, testRgb);
      const testHex = rgbToHex(
        testRgb.r,
        testRgb.g,
        testRgb.b
      );

      if (
        testHex.toUpperCase() !==
          referenceHex.toUpperCase() &&
        testRatio >= targetRatio
      ) {
        return testHex;
      }
    }
    return null;
  };

  const getSuggestions = () => {
    const suggestions = [];

    const aaLighter = findClosestLighter(
      WCAG_LEVELS.AA_NORMAL.ratio,
      referenceContrastHex
    );
    const aaDarker = findClosestDarker(
      WCAG_LEVELS.AA_NORMAL.ratio,
      referenceContrastHex
    );

    suggestions.push({
      level: 'AA',
      lighter: aaLighter,
      darker: aaDarker,
      passes: passesRefAA
    });

    const aaaLighter = findClosestLighter(
      WCAG_LEVELS.AAA_NORMAL.ratio,
      referenceContrastHex
    );
    const aaaDarker = findClosestDarker(
      WCAG_LEVELS.AAA_NORMAL.ratio,
      referenceContrastHex
    );

    suggestions.push({
      level: 'AAA',
      lighter: aaaLighter,
      darker: aaaDarker,
      passes: passesRefAAA
    });

    return suggestions;
  };

  const suggestions = getSuggestions();

  const Badge = ({ level, pass }) => (
    <span
      className="px-2 py-0.5 rounded text-xs font-bold"
      style={{
        background: pass ? '#dcfce7' : '#fee2e2',
        color: pass ? '#166534' : '#991b1b'
      }}
    >
      {level}: {pass ? 'PASS' : 'FAIL'}
    </span>
  );

  const handleContrastInput = (e) => {
    const value = e.target.value
      .replace('#', '')
      .toUpperCase();

    if (/^[0-9A-Fa-f]{0,6}$/.test(value)) {
      const newHex = `#${value}`;
      setContrastHex(newHex);
      setReferenceContrastHex(newHex);

      const newHistory = history.slice(
        0,
        historyIndex + 1
      );
      newHistory.push(newHex);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);

      setAppliedOptions(new Set());
    }
  };

  const applySuggestion = (
    suggestedHex,
    optionKey
  ) => {
    setContrastHex(suggestedHex);

    const newHistory = history.slice(
      0,
      historyIndex + 1
    );
    newHistory.push(suggestedHex);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    setAppliedOptions(new Set([optionKey]));
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setContrastHex(history[newIndex]);
      setAppliedOptions(new Set());
    }
  };

  const reset = () => {
    const defaultContrast =
    getIdealContrast(fullHex);
    setContrastHex(defaultContrast);
    setReferenceContrastHex(defaultContrast);
    setHistory([defaultContrast]);
    setHistoryIndex(0);
    setAppliedOptions(new Set());
  };

  return (
    <>
      <Card t={t} title="Live Preview">
        <div className="grid grid-cols-2 gap-3">
          {[
            [fullHex, contrastHex],
            [contrastHex, fullHex]
          ].map(([bg, fg], i) => (
            <div
              key={i}
              className="rounded-lg p-4 flex flex-col items-center justify-center gap-1"
              style={{
                background: bg,
                minHeight: '110px'
              }}
            >
              <span
                style={{ color: fg }}
                className="text-2xl font-bold"
              >
                Aa
              </span>
              <span
                style={{ color: fg }}
                className="text-sm"
              >
                Normal Text
              </span>
              <span
                style={{ color: fg }}
                className="text-xs"
              >
                Small Text
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card t={t}>
        {/* Color Controls - Fixed flex with min-widths */}
        <div className="flex gap-6 flex-wrap items-baseline mb-3">
          {/* Base Color - min-width prevents squishing */}
          <div style={{ minWidth: '140px' }}>
            <label
              style={{ color: t.muted }}
              className="text-xs"
            >
              Base Color
            </label>
            <div className="flex items-center gap-2 mt-0.5">
              <div
                className="w-7 h-7 rounded border"
                style={{
                  background: fullHex,
                  borderColor: t.border,
                  boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                }}
              />
              <span
                style={{ color: t.text }}
                className="font-mono text-xs"
              >
                {fullHex.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Contrast Color - min-width prevents squishing */}
          <div style={{ minWidth: '160px' }}>
            <label
              style={{ color: t.muted }}
              className="text-xs"
            >
              Contrast Color
            </label>
            <div className="flex items-center gap-2 mt-0.5">
              <div
                className="w-7 h-7 rounded border"
                style={{
                  background: contrastHex,
                  borderColor: t.border,
                  boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                }}
              />
              <input
                type="text"
                value={contrastHex.replace('#', '')}
                onChange={handleContrastInput}
                maxLength={6}
                className="font-mono text-xs border rounded px-1.5 py-0.5 w-16"
                style={{
                  borderColor: t.border,
                  background: t.card,
                  color: t.text
                }}
              />
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={reset}
            className="text-xs font-semibold h-7 px-2 rounded"
            style={{
              background: '#267FD9',
              color: '#fff',
              border: `1px solid ${t.border}`
            }}
          >
            Reset
          </button>
        </div>

        {/* Ratio + Badges */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span
            style={{ color: t.text }}
            className="text-xl font-bold"
          >
            {liveRatio.toFixed(2)}:1
          </span>
          <Badge
            level="AA Normal"
            pass={liveRatio >= WCAG_LEVELS.AA_NORMAL.ratio}
          />
          <Badge
            level="AA Large"
            pass={liveRatio >= WCAG_LEVELS.AA_LARGE.ratio}
          />
          <Badge
            level="AAA Normal"
            pass={liveRatio >= WCAG_LEVELS.AAA_NORMAL.ratio}
          />
        </div>

        {/* Suggested Fixes */}
        <div>
          <p
            style={{ color: t.text }}
            className="text-sm font-semibold mb-2"
          >
            Suggested Fixes
          </p>

          <div className="space-y-5">
            {suggestions.map((suggestion, index) => {
              const hasOptions =
                suggestion.lighter || suggestion.darker;
              const refAlreadyPasses = suggestion.passes;

              return (
                <div
                  key={index}
                  className="p-3 rounded-lg"
                  style={{
                    background: `${t.muted}15`,
                    border: `1px solid ${t.border}`
                  }}
                >
                  <div className="flex items-start gap-3">
                    {/* Reference color block with shadow */}
                    <div
                      className="w-8 h-8 rounded border flex-shrink-0"
                      style={{
                        background: referenceContrastHex,
                        borderColor: t.border,
                        boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                      }}
                      title={`Reference: ${referenceContrastHex.toUpperCase()}`}
                    />

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          style={{ color: t.text }}
                          className="text-sm font-semibold"
                        >
                          {suggestion.level}
                        </span>
                      </div>

                      {/* State 1: Passing */}
                      {refAlreadyPasses && (
                        <div
                          style={{ color: t.muted }}
                          className="text-xs"
                        >
                          PASS - no suggestions
                        </div>
                      )}

                      {/* State 2: No options available */}
                      {!refAlreadyPasses && !hasOptions && (
                        <div
                          style={{ color: t.text }}
                          className="text-xs"
                        >
                          No PASS option available
                        </div>
                      )}

                      {/* State 3: Show options */}
                      {!refAlreadyPasses && hasOptions && (
                        <div>
                          {/* Undo button at top-right */}
                          <div className="flex items-center justify-end mb-2">
                            <button
                              onClick={undo}
                              disabled={historyIndex === 0}
                              className="px-2 py-1 rounded-lg text-xs font-semibold transition-opacity"
                              style={{
                                background:
                                  historyIndex === 0
                                    ? t.card
                                    : '#267FD9',
                                color:
                                  historyIndex === 0
                                    ? t.muted
                                    : '#fff',
                                opacity:
                                  historyIndex === 0 ? 0.5 : 1,
                                cursor:
                                  historyIndex === 0
                                    ? 'not-allowed'
                                    : 'pointer',
                                border: `1px solid ${t.border}`
                              }}
                            >
                              Undo
                            </button>
                          </div>

                          {/* Darker and Lighter side-by-side with space-between */}
                          <div className="flex items-center justify-between gap-4 flex-wrap">
                            {/* Darker option */}
                            <div className="flex items-center justify-around gap-2 flex-shrink-0">
                              <strong
                                style={{ color: t.text }}
                                className="text-xs"
                              >
                                Darker
                              </strong>
                              {suggestion.darker ? (
                                <>
                                  <div
                                    className="w-6 h-6 rounded border flex-shrink-0"
                                    style={{
                                      background: suggestion.darker,
                                      borderColor: t.border,
                                      boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                                    }}
                                  />
                                  <span
                                    style={{ color: t.text }}
                                    className="text-xs font-mono"
                                  >
                                    {suggestion.darker.toUpperCase()}
                                  </span>
                                  <button
                                    onClick={() =>
                                      applySuggestion(
                                        suggestion.darker,
                                        `${suggestion.level}-darker`
                                      )
                                    }
                                    disabled={appliedOptions.has(
                                      `${suggestion.level}-darker`
                                    )}
                                    className="px-2 py-1 rounded-lg text-xs font-semibold transition-opacity"
                                    style={{
                                      background: appliedOptions.has(
                                        `${suggestion.level}-darker`
                                      )
                                        ? t.card
                                        : '#267FD9',
                                      color: appliedOptions.has(
                                        `${suggestion.level}-darker`
                                      )
                                        ? t.muted
                                        : '#fff',
                                      opacity: appliedOptions.has(
                                        `${suggestion.level}-darker`
                                      )
                                        ? 0.5
                                        : 1,
                                      cursor: appliedOptions.has(
                                        `${suggestion.level}-darker`
                                      )
                                        ? 'not-allowed'
                                        : 'pointer',
                                      border: `1px solid ${t.border}`
                                    }}
                                  >
                                    Apply
                                  </button>
                                </>
                              ) : (
                                <span
                                  style={{ color: t.text }}
                                  className="text-xs"
                                >
                                  No PASS option available
                                </span>
                              )}
                            </div>

                            {/* Lighter option */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <strong
                                style={{ color: t.text }}
                                className="text-xs"
                              >
                                Lighter
                              </strong>
                              {suggestion.lighter ? (
                                <>
                                  <div
                                    className="w-6 h-6 rounded border flex-shrink-0"
                                    style={{
                                      background: suggestion.lighter,
                                      borderColor: t.border,
                                      boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                                    }}
                                  />
                                  <span
                                    style={{ color: t.text }}
                                    className="text-xs font-mono"
                                  >
                                    {suggestion.lighter.toUpperCase()}
                                  </span>
                                  <button
                                    onClick={() =>
                                      applySuggestion(
                                        suggestion.lighter,
                                        `${suggestion.level}-lighter`
                                      )
                                    }
                                    disabled={appliedOptions.has(
                                      `${suggestion.level}-lighter`
                                    )}
                                    className="px-2 py-1 rounded-lg text-xs font-semibold transition-opacity"
                                    style={{
                                      background: appliedOptions.has(
                                        `${suggestion.level}-lighter`
                                      )
                                        ? t.card
                                        : '#267FD9',
                                      color: appliedOptions.has(
                                        `${suggestion.level}-lighter`
                                      )
                                        ? t.muted
                                        : '#fff',
                                      opacity: appliedOptions.has(
                                        `${suggestion.level}-lighter`
                                      )
                                        ? 0.5
                                        : 1,
                                      cursor: appliedOptions.has(
                                        `${suggestion.level}-lighter`
                                      )
                                        ? 'not-allowed'
                                        : 'pointer',
                                      border: `1px solid ${t.border}`
                                    }}
                                  >
                                    Apply
                                  </button>
                                </>
                              ) : (
                                <span
                                  style={{ color: t.text }}
                                  className="text-xs"
                                >
                                  No PASS option available
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* What is WCAG? Info Card */}
      <Card t={t} title="What is WCAG Contrast?">
        <div style={{ background: `${t.muted}15` }} className="rounded-lg p-3">
          <p style={{ color: t.muted }} className="text-xs leading-relaxed mb-3">
            WCAG (Web Content Accessibility Guidelines) measures how readable text is against its background.
            Higher ratios mean better readability for people with visual impairments.
          </p>

          <p style={{ color: t.text }} className="text-xs font-semibold mb-1">Standards:</p>
          <div style={{ color: t.muted }} className="text-xs space-y-1 mb-3">
            <div><strong style={{ color: t.text }}>AA Normal (4.5:1)</strong> - Minimum for small/medium text</div>
            <div><strong style={{ color: t.text }}>AA Large (3:1)</strong> - For large text (18pt+ or 14pt+ bold)</div>
            <div><strong style={{ color: t.text }}>AAA Normal (7:1)</strong> - Enhanced accessibility</div>
          </div>

          <p style={{ color: t.text }} className="text-xs font-semibold mb-1">Hardest Colors to Work With:</p>
          <div style={{ color: t.muted }} className="text-xs space-y-1 mb-3">
            <div>• <strong style={{ color: t.text }}>Mid-tones</strong> (25-75% brightness: grays, pastels) - need extreme light or dark pairs</div>
            <div>• <strong style={{ color: t.text }}>Yellow</strong> - requires dark text, hard to read on white</div>
            <div className="flex items-center gap-1 flex-wrap">
              <span>• <strong style={{ color: t.text }}>Similar brightness</strong> - like</span>
              <div className="flex items-center">
                <div className="w-4 h-4" style={{ background: '#C44536' }}></div>
                <div className="w-4 h-4" style={{ background: '#5C9C5C' }}></div>
              </div>
              <span>red on green, or</span>
              <div className="flex items-center">
                <div className="w-4 h-4" style={{ background: '#4A7BA7' }}></div>
                <div className="w-4 h-4" style={{ background: '#B87A4A' }}></div>
              </div>
              <span>blue on orange</span>
            </div>
          </div>

          <p style={{ color: t.text }} className="text-xs font-semibold mb-1">Pro Tips:</p>
          <div style={{ color: t.muted }} className="text-xs space-y-1">
            <div>• <strong style={{ color: t.text }}>Grayscale test:</strong> Convert to grayscale - if colors look similar in gray, contrast is too low. Contrast is about brightness difference, not color difference.</div>
            <div>• Pure black (#000000) and white (#FFFFFF) always pass AAA</div>
            <div>• Increase difference in lightness, not just hue</div>
          </div>
        </div>
      </Card>
    </>
  );
}

export default Contrast;