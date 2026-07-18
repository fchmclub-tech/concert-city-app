import { ExternalLink, Trophy } from 'lucide-react'

export default function PriceComparisonCard({
  providers = [],
}) {
  const validProviders = providers
    .filter(
      (provider) =>
        provider &&
        typeof provider.price === 'number' &&
        provider.url,
    )
    .sort((first, second) => first.price - second.price)

 if (validProviders.length === 0) {
  return (
    <div className="priceComparisonCard">
      <div className="bestDealHeader">
        <span className="bestDealBadge">
          <Trophy size={15} />
          Compare tickets
        </span>
      </div>

      <div className="bestDealPrimary">
        <div>
          <p>Live prices are not currently listed</p>
          <strong>Check each provider below</strong>
        </div>
      </div>
    </div>
  )
}

  const bestDeal = validProviders[0]
  const highestPrice =
    validProviders[validProviders.length - 1].price

  const savings = Math.max(
    0,
    Math.round(highestPrice - bestDeal.price),
  )

  return (
    <div className="priceComparisonCard">
      <div className="bestDealHeader">
        <span className="bestDealBadge">
          <Trophy size={15} />
          Best deal
        </span>

        {savings > 0 && (
          <span className="bestDealSavings">
            Save ${savings}
          </span>
        )}
      </div>

      <div className="bestDealPrimary">
        <div>
          <p>Lowest available price</p>
          <strong>{bestDeal.name}</strong>
        </div>

        <span>${Math.round(bestDeal.price)}</span>
      </div>

      <div className="providerComparisonList">
        {validProviders.map((provider, index) => (
          <a
            key={`${provider.name}-${provider.price}`}
            href={provider.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`providerComparisonRow ${
              index === 0 ? 'best' : ''
            }`}
          >
            <span>
              {index === 0 && <Trophy size={14} />}
              {provider.name}
            </span>

            <strong>
              ${Math.round(provider.price)}
              <ExternalLink size={13} />
            </strong>
          </a>
        ))}
      </div>
    </div>
  )
}