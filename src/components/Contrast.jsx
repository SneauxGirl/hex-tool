import { useState } from 'react';
import Card from './shared/Card';
import { contrastRatio, getIdealContrast, hexToRgb, rgbToHex, clamp } from '../utils/colorUtils';
import { WCAG_LEVELS } from '../utils/constants';

function Contrast({ hex, t }) {
  const fullHex = `#${hex}`;
  const [contrastHex, setContrastHex] = useState(getIdealContrast(fullHex));
  const [history, setHistory] = useState([getIdealContrast(fullHex)]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [appliedSuggestions, setAppliedSuggestions] = useState(new Set());

  const ratio = contrastRatio(hexToRgb(fullHex), hexToRgb(contrastHex));

  // Check if current color already passes a standard
  const passesAA = ratio >= WCAG_LEVELS.AA_NORMAL.ratio;
  const passesAAA = ratio >= WCAG_LEVELS.AAA_NORMAL.ratio;

  // Find closest passing color by lightening
  const findClosestLighter = (targetRatio) => {
    const baseRgb = hexToRgb(fullHex);
    const contrastRgb = hexToRgb(contrastHex);
    
    let testRgb = { ...contrastRgb };
    for (let i = 1; i < 255; i++) {
      testRgb.r = clamp(contrastRgb.r + i);
      testRgb.g = clamp(contrastRgb.g + i);
      testRgb.b = clamp(contrastRgb.b + i);
      
      const testHex = rgbToHex(testRgb.r, testRgb.g, testRgb.b);
      const testRatio = contrastRatio(baseRgb, testRgb);
      
      if (testHex.toUpperCase() !== contrastHex.toUpperCase() && testRatio >= targetRatio) {
        return testHex;
      }
    }
    
    return null;
  };

  // Find closest passing color by darkening
  const findClosestDarker = (targetRatio) => {
    const baseRgb = hexToRgb(fullHex);
    const contrastRgb = hexToRgb(contrastHex);
    
    let testRgb = { ...contrastRgb };
    for (let i = 1; i < 255; i++) {
      testRgb.r = clamp(contrastRgb.r - i);
      testRgb.g = clamp(contrastRgb.g - i);
      testRgb.b = clamp(contrastRgb.b - i);
      
      const testHex = rgbToHex(testRgb.r, testRgb.g, testRgb.b);
      const testRatio = contrastRatio(baseRgb, testRgb);
      
      if (testHex.toUpperCase() !== contrastHex.toUpperCase() && testRatio >= targetRatio) {
        return testHex;
      }
    }
    
    return null;
  };

  // Get suggestions for both standards with both directions
  const getSuggestions = () => {
    const suggestions = [];
    
    // AA suggestions
    if (!passesAA) {
      const aaLighter = findClosestLighter(WCAG_LEVELS.AA_NORMAL.ratio);
      const aaDarker = findClosestDarker(WCAG_LEVELS.AA_NORMAL.ratio);
      
      suggestions.push({
        level: 'AA',
        lighter: aaLighter,
        darker: aaDarker,
        ratio: WCAG_LEVELS.AA_NORMAL.ratio
      });
    }
    
    // AAA suggestions
    if (!passesAAA) {
      const aaaLighter = findClosestLighter(WCAG_LEVELS.AAA_NORMAL.ratio);
      const aaaDarker = findClosestDarker(WCAG_LEVELS.AAA_NORMAL.ratio);
      
      suggestions.push({
        level: 'AAA',
        lighter: aaaLighter,
        darker: aaaDarker,
        ratio: WCAG_LEVELS.AAA_NORMAL.ratio
      });
    }
    
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
    const value = e.target.value.replace('#', '').toUpperCase();
    if (/^[0-9A-Fa-f]{0,6}$/.test(value)) {
      const newHex = `#${value}`;
      setContrastHex(newHex);
      
      // Add to history
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newHex);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      
      // Clear applied suggestions
      setAppliedSuggestions(new Set());
    }
  };

  const applySuggestion = (suggestedHex, suggestionKey) => {
    setContrastHex(suggestedHex);
    
    // Add to history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(suggestedHex);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    
    // Mark this suggestion as applied
    setAppliedSuggestions(new Set([...appliedSuggestions, suggestionKey]));
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setContrastHex(history[newIndex]);
      
      // Clear applied suggestions when undoing
      setAppliedSuggestions(new Set());
    }
  };

  return (
    <>
      <Card t={t} title="Live Preview">
        <div className="grid grid-cols-2 gap-3">
          {[[fullHex, contrastHex], [contrastHex, fullHex]].map(([bg, fg], index) => (
            <div
              key={index}
              className="rounded-lg p-4 flex flex-col items-center justify-center gap-1"
              style={{ background: bg, minHeight: '110px' }}
            >
              <span style={{ color: fg }} className="text-2xl font-bold">Aa</span>
              <span style={{ color: fg }} className="text-sm">Normal Text</span>
              <span style={{ color: fg }} className="text-xs">Small Text</span>
            </div>
          ))}
        </div>
      </Card>

      <Card t={t}>
        <div className="flex gap-4 flex-wrap items-end mb-3">
          <div>
            <label style={{ color: t.muted }} className="text-xs">Base Color</label>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="w-7 h-7 rounded border" style={{ background: fullHex, borderColor: t.border }} />
              <span style={{ color: t.text }} className="font-mono text-xs">{fullHex.toUpperCase()}</span>
            </div>
          </div>
          <div>
            <label style={{ color: t.muted }} className="text-xs">Contrast Color</label>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="w-7 h-7 rounded border" style={{ background: contrastHex, borderColor: t.border }} />
              <input
                type="text"
                value={contrastHex.replace('#', '')}
                onChange={handleContrastInput}
                maxLength={6}
                className="font-mono text-xs border rounded px-1.5 py-0.5 w-16"
                style={{ borderColor: t.border, background: t.card, color: t.text }}
              />
            </div>
          </div>
        </div>

        {/* Reordered Pass/Fail Badges */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span style={{ color: t.text }} className="text-xl font-bold">{ratio.toFixed(2)}:1</span>
          <Badge level="AA Normal" pass={ratio >= WCAG_LEVELS.AA_NORMAL.ratio} />
          <Badge level="AA Large" pass={ratio >= WCAG_LEVELS.AA_LARGE.ratio} />
          <Badge level="AAA Normal" pass={ratio >= WCAG_LEVELS.AAA_NORMAL.ratio} />
        </div>

        {/* Suggested Fixes */}
        {suggestions.length > 0 ? (
          <div>
            <p style={{ color: t.text }} className="text-sm font-semibold mb-2">Suggested Fixes</p>
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => {
                const hasOptions = suggestion.lighter || suggestion.darker;
                
                return (
                  <div
                    key={index}
                    className="p-2 rounded-lg"
                    style={{ background: `${t.muted}15`, border: `1px solid ${t.border}` }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span style={{ color: t.text }} className="text-sm font-semibold">
                          {suggestion.level}
                        </span>
                        
                        {hasOptions ? (
                          <>
                            {/* Lighter option */}
                            {suggestion.lighter && (
                              <>
                                <span style={{ color: t.muted }} className="text-xs">Lighter</span>
                                <div
                                  className="w-6 h-6 rounded border"
                                  style={{ background: suggestion.lighter, borderColor: t.border }}
                                />
                                <span style={{ color: t.muted }} className="text-xs font-mono">
                                  {suggestion.lighter.toUpperCase()}
                                </span>
                                <button
                                  onClick={() => applySuggestion(suggestion.lighter, `${suggestion.level}-lighter`)}
                                  disabled={appliedSuggestions.has(`${suggestion.level}-lighter`)}
                                  className="px-2 py-1 rounded-lg text-xs font-semibold transition-opacity"
                                  style={{ 
                                    background: appliedSuggestions.has(`${suggestion.level}-lighter`) ? t.card : '#267FD9', 
                                    color: appliedSuggestions.has(`${suggestion.level}-lighter`) ? t.muted : '#fff',
                                    opacity: appliedSuggestions.has(`${suggestion.level}-lighter`) ? 0.5 : 1,
                                    cursor: appliedSuggestions.has(`${suggestion.level}-lighter`) ? 'not-allowed' : 'pointer',
                                    border: `1px solid ${t.border}`
                                  }}
                                >
                                  Apply
                                </button>
                              </>
                            )}
                            
                            {/* Darker option */}
                            {suggestion.darker && (
                              <>
                                <span style={{ color: t.muted }} className="text-xs">Darker</span>
                                <div
                                  className="w-6 h-6 rounded border"
                                  style={{ background: suggestion.darker, borderColor: t.border }}
                                />
                                <span style={{ color: t.muted }} className="text-xs font-mono">
                                  {suggestion.darker.toUpperCase()}
                                </span>
                                <button
                                  onClick={() => applySuggestion(suggestion.darker, `${suggestion.level}-darker`)}
                                  disabled={appliedSuggestions.has(`${suggestion.level}-darker`)}
                                  className="px-2 py-1 rounded-lg text-xs font-semibold transition-opacity"
                                  style={{ 
                                    background: appliedSuggestions.has(`${suggestion.level}-darker`) ? t.card : '#267FD9', 
                                    color: appliedSuggestions.has(`${suggestion.level}-darker`) ? t.muted : '#fff',
                                    opacity: appliedSuggestions.has(`${suggestion.level}-darker`) ? 0.5 : 1,
                                    cursor: appliedSuggestions.has(`${suggestion.level}-darker`) ? 'not-allowed' : 'pointer',
                                    border: `1px solid ${t.border}`
                                  }}
                                >
                                  Apply
                                </button>
                              </>
                            )}
                          </>
                        ) : (
                          <span style={{ color: t.muted }} className="text-xs">
                            No PASS option available
                          </span>
                        )}
                      </div>
                      
                      {/* Undo button - only show if there are options */}
                      {hasOptions && (
                        <button
                          onClick={undo}
                          disabled={historyIndex === 0}
                          className="px-2 py-1 rounded-lg text-xs font-semibold transition-opacity flex-shrink-0"
                          style={{ 
                            background: historyIndex === 0 ? t.card : '#267FD9', 
                            color: historyIndex === 0 ? t.muted : '#fff',
                            opacity: historyIndex === 0 ? 0.5 : 1,
                            cursor: historyIndex === 0 ? 'not-allowed' : 'pointer',
                            border: `1px solid ${t.border}`
                          }}
                        >
                          Undo
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div style={{ background: `${t.muted}15` }} className="rounded-lg p-3">
            <p style={{ color: t.muted }} className="text-xs text-center">
              ✓ Current contrast passes all standards! No suggestions needed.
            </p>
          </div>
        )}
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
            <div>• <strong style={{ color: t.text }}>Similar brightness</strong> - like teal on orange</div>
          </div>

          <p style={{ color: t.text }} className="text-xs font-semibold mb-1">Pro Tips:</p>
          <div style={{ color: t.muted }} className="text-xs space-y-1">
            <div>• <strong style={{ color: t.text }}>Grayscale test:</strong> Convert to grayscale - if colors look similar in gray, contrast is too low. Contrast is about brightness difference, not color difference.</div>
          </div>
        </div>
      </Card>
    </>
  );
}

export default Contrast;