import { useState } from 'react'
import {
  ExternalLink,
  ShieldCheck,
  Ticket,
} from 'lucide-react'
import CompareTicketsModal from './CompareTicketsModal.jsx'

export default function PriceComparisonCard({
  providers = [],
  eventName = 'Event',
}) {
  const [showModal, setShowModal] = useState(false)

  const availableProviders = providers.filter(
    (provider) => provider && provider.url,
  )

  const primaryProvider =
    availableProviders.find((provider) => provider.official) ||
    availableProviders[0] ||
    null

  const providerCount = providers.filter(Boolean).length

  return (
    <>
      <div className="priceComparisonCard compactComparisonCard">
        <div className="bestDealHeader">
          <span className="bestDealBadge">
            <Ticket size={15} />
            Compare tickets
          </span>

          <span className="providerCount">
            {providerCount} providers
          </span>
        </div>

        {primaryProvider ? (
          <a
            href={primaryProvider.url}
            target="_blank"
            rel="noopener noreferrer"
            className="primaryProviderRow"
          >
            <span className="providerName">
              <Ticket size={17} />

              <span>
                {primaryProvider.name}

                {primaryProvider.official && (
                  <small>
                    <ShieldCheck size={12} />
                    Official seller
                  </small>
                )}
              </span>
            </span>

            <strong>
              {typeof primaryProvider.price === 'number'
                ? `From $${Math.round(primaryProvider.price)}`
                : 'See prices'}

              <ExternalLink size={14} />
            </strong>
          </a>
        ) : (
          <div className="noProviderMessage">
            Live ticket links are not currently available.
          </div>
        )}

        <button
          type="button"
          className="compareAllButton"
          onClick={() => setShowModal(true)}
        >
          Compare all {providerCount} providers
        </button>
      </div>

      {showModal && (
        <CompareTicketsModal
          providers={providers}
          eventName={eventName}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}