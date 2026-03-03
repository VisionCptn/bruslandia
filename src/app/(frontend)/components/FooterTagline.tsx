import { getPayload } from 'payload'
import config from '@payload-config'
import { EyesIcon } from './icons'
import { getRandomRotationClass } from '../utils/randomPosition'

export const FooterTagline = async () => {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'settings' })

  return (
    <div className="text-center mb-10">
      {settings.footerText && (
        <div className="text-sm leading-[2] mb-6 overflow-hidden">
          {settings.footerText.split('\n').map((line, i) => {
            const words = line.split(' ')
            const pairs = []

            // Group words into pairs
            for (let j = 0; j < words.length; j += 2) {
              pairs.push(words.slice(j, j + 2).join(' '))
            }

            return (
              <div key={i} className="flex flex-wrap items-center justify-center gap-x-2">
                {pairs.map((pair, pairIdx) => {
                  return (
                    <span
                      key={pairIdx}
                      className={`inline-block duration-500 ${getRandomRotationClass()}`}
                    >
                      {/* Logic to handle the blue 'М' within the pair */}
                      {pair.split(' ').map((word, wIdx) => (
                        <span key={wIdx}>
                          {word.startsWith('М') ? (
                            <>
                              <span className="text-blue-500 font-bold">М</span>
                              {word.slice(1)}
                            </>
                          ) : (
                            word
                          )}
                          {wIdx === 0 ? ' ' : ''}
                        </span>
                      ))}
                    </span>
                  )
                })}
              </div>
            )
          })}
        </div>
      )}

      <div className="flex justify-center">
        <EyesIcon width={140} height={80} className="text-black" />
      </div>
    </div>
  )
}
