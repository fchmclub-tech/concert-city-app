import {
  ExternalLink,
  ShieldCheck,
  Ticket,
  X,
} from 'lucide-react'

export default function CompareTicketsModal({
  providers = [],
  eventName = 'Event',
  onClose,
}) {
  return (
    <div className="compareModalBackdrop" onClick={onClose}>
      <div
        className="compareModal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="compareModalHeader">
          <div>
            <p>Compare ticket providers</p>
            <h2>{eventName}</h2>
          </div>

          <button
            type="button"
            className="compareModalClose"
            onClick={onClose}
            aria-label="Close ticket comparison"
          >
            <X size={20} />
          </button>
        </div>

        <div className="compareModalList">
          {providers.filter(Boolean).map((provider) => {
            const isAvailable =
              Boolean(provider.url) &&
              provider.status !== 'coming-soon'

            if (isAvailable) {
              return (
                <a
                  key={provider.name}
                  href={provider.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="compareModalProvider available"
                >
                  <span className="compareModalProviderName">
                    <Ticket size={18} />

                    <span>
                      <strong>{provider.name}</strong>

                      {provider.official && (
                        <small>
                          <ShieldCheck size={13} />
                          Official seller
                        </small>
                      )}
                    </span>
                  </span>

                  <span className="compareModalProviderAction">
                    {typeof provider.price === 'number'
                      ? `From $${Math.round(provider.price)}`
                      : 'See prices'}

                    <ExternalLink size={15} />
                  </span>
                </a>
              )
            }

            return (
              <div
                key={provider.name}
                className="compareModalProvider unavailable"
              >
                <span className="compareModalProviderName">
                  <Ticket size={18} />

                  <span>
                    <strong>{provider.name}</strong>
                    <small>Integration pending</small>
                  </span>
                </span>

                <span>Coming soon</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}