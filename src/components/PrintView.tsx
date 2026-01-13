import { useApp } from '../hooks/use-app';
import type { ActivityPhase } from '../types';

export default function PrintView() {
  const { user, activities, phaseNames, t } = useApp();
  const today = new Date().toLocaleDateString(user.language === 'af' ? 'af-ZA' : 'en-ZA', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long',
    year: 'numeric'
  });

  const phases: ActivityPhase[] = ['arrival', 'organization', 'study'];
  const studySubTasks = ['read', 'notes', 'practice'];

  // Theme colors
  const isMeisie = user.theme === 'meisie';
  const primaryColor = isMeisie ? '#d946ef' : '#0ea5e9';
  const secondaryColor = isMeisie ? '#a855f7' : '#06b6d4';
  const lightBg = isMeisie ? '#fdf2f8' : '#ecfeff';
  const accentBg = isMeisie ? '#fae8ff' : '#e0f2fe';
  const borderColor = isMeisie ? '#f9a8d4' : '#7dd3fc';


  return (
    <div className="print-only" style={{
      display: 'none',
      padding: '1cm',
      backgroundColor: 'white',
      color: '#1f2937',
      minHeight: '100vh',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      maxWidth: '21cm',
      margin: '0 auto',
      boxSizing: 'border-box'
    }}>
      {/* Decorative Header Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '180px',
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
        opacity: 0.1,
        borderRadius: '0 0 50px 50px'
      }} />

      {/* Header */}
      <header style={{
        position: 'relative',
        paddingBottom: '1rem',
        marginBottom: '1.5rem',
        borderBottom: `4px solid ${primaryColor}`,
        pageBreakAfter: 'avoid'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '1rem'
        }}>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: '900',
              letterSpacing: '-0.02em',
              marginBottom: '0.5rem',
              color: primaryColor
            }}>
              {user.language === 'af' ? '✨ Daaglikse Lysie' : '✨ Daily Checklist'}
            </div>
            <div style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              color: '#374151'
            }}>
              {user.name}
            </div>
          </div>
          <div style={{
            textAlign: 'right',
            padding: '1rem',
            backgroundColor: accentBg,
            borderRadius: '16px',
            border: `2px solid ${borderColor}`
          }}>
            <div style={{
              fontSize: '2.5rem',
              marginBottom: '0.25rem'
            }}>
              {isMeisie ? '🐼' : '🚀'}
            </div>
            <div style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: primaryColor
            }}>
              {today}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ marginBottom: '1.5rem' }}>
        {phases.map((phase) => (
          <section key={phase} style={{
            marginBottom: '1.25rem',
            pageBreakInside: 'avoid',
            breakInside: 'avoid'
          }}>
            {/* Phase Header */}
            <div style={{
              backgroundColor: primaryColor,
              color: 'white',
              padding: '0.625rem 1rem',
              borderRadius: '10px',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.625rem',
              pageBreakAfter: 'avoid',
              pageBreakInside: 'avoid'
            }}>
              <div style={{
                fontSize: '1.5rem'
              }}>
                {phase === 'arrival' ? '🏠' : phase === 'organization' ? '📚' : '🎯'}
              </div>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                margin: 0
              }}>
                {user.language === 'af' ? phaseNames[phase].af : phaseNames[phase].en}
              </h2>
            </div>

            {/* Activities */}
            <div style={{
              backgroundColor: lightBg,
              borderRadius: '10px',
              padding: '0.75rem',
              border: `2px solid ${borderColor}`,
              pageBreakInside: 'avoid'
            }}>
              {activities[phase].map((activity, activityIndex) => (
                <div key={activity.id} style={{
                  marginBottom: activityIndex < activities[phase].length - 1 ? '0.75rem' : 0
                }}>
                  {/* Main Activity */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    border: `2px solid ${borderColor}`,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{
                      width: '1.25rem',
                      height: '1.25rem',
                      border: `3px solid ${primaryColor}`,
                      flexShrink: 0,
                      marginTop: '0.125rem',
                      borderRadius: '4px',
                      backgroundColor: 'white'
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        flexWrap: 'wrap'
                      }}>
                        <span style={{ 
                          fontSize: '1.0625rem',
                          fontWeight: phase === 'study' ? '700' : '600',
                          color: '#1f2937'
                        }}>
                          {user.language === 'af' ? activity.label.af : activity.label.en}
                        </span>
                        {activity.hasTimer && (
                          <span style={{
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            backgroundColor: primaryColor,
                            color: 'white',
                            padding: '0.25rem 0.625rem',
                            borderRadius: '6px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                          }}>
                            ⏱ {activity.timerDuration}m
                          </span>
                        )}
                      </div>

                      {/* Nested Study Tasks */}
                      {phase === 'study' && (
                        <div style={{
                          marginTop: '0.75rem',
                          paddingLeft: '0.75rem',
                          borderLeft: `3px solid ${borderColor}`,
                          backgroundColor: accentBg,
                          padding: '0.625rem',
                          borderRadius: '6px',
                          marginLeft: '0.5rem'
                        }}>
                          {studySubTasks.map((subTask, subIndex) => (
                            <div key={subTask} style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.625rem',
                              padding: '0.375rem 0',
                              borderBottom: subIndex < studySubTasks.length - 1 ? `1px dashed ${borderColor}` : 'none'
                            }}>
                              <div style={{
                                width: '0.875rem',
                                height: '0.875rem',
                                border: `2.5px solid ${secondaryColor}`,
                                flexShrink: 0,
                                borderRadius: '3px',
                                backgroundColor: 'white'
                              }} />
                              <span style={{
                                fontSize: '0.9375rem',
                                color: '#4b5563',
                                fontWeight: '500'
                              }}>
                                {t(subTask)}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {activities[phase].length === 0 && (
                <p style={{ 
                  fontStyle: 'italic', 
                  color: '#9ca3af',
                  textAlign: 'center',
                  padding: '1.5rem'
                }}>
                  {user.language === 'af' ? 'Geen take nie' : 'No tasks'}
                </p>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Footer */}
      <footer style={{
        marginTop: '1.5rem',
        borderTop: `3px solid ${primaryColor}`,
        paddingTop: '1rem',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '1.5rem',
        pageBreakInside: 'avoid',
        breakInside: 'avoid'
      }}>
        <div style={{
          backgroundColor: lightBg,
          padding: '1.25rem',
          borderRadius: '12px',
          border: `2px solid ${borderColor}`
        }}>
          <p style={{
            fontWeight: '700',
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '1rem',
            color: primaryColor,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>📝</span>
            {user.language === 'af' ? 'Notas' : 'Notes'}
          </p>
          <div style={{ borderBottom: `2px dashed ${borderColor}`, height: '2rem', marginBottom: '0.5rem' }} />
          <div style={{ borderBottom: `2px dashed ${borderColor}`, height: '2rem', marginBottom: '0.5rem' }} />
          <div style={{ borderBottom: `2px dashed ${borderColor}`, height: '2rem', marginBottom: '0.5rem' }} />
          <div style={{ borderBottom: `2px dashed ${borderColor}`, height: '2rem' }} />
        </div>
        <div style={{
          backgroundColor: primaryColor,
          padding: '1.25rem',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{ 
            fontSize: '3rem',
            marginBottom: '0.5rem',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
          }}>🏆</div>
          <p style={{
            fontSize: '1rem',
            fontWeight: '800',
            marginBottom: '0.25rem'
          }}>
            {user.language === 'af' ? 'Jy is fantasties!' : 'You are awesome!'}
          </p>
          <p style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            opacity: 0.9
          }}>
            {user.language === 'af' ? 'Goeie werk!' : 'Great work!'}
          </p>
        </div>
      </footer>
    </div>
  );
}
