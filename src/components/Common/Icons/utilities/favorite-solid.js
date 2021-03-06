import React from 'react'

const SvgFavoriteSolid = props => (
    <svg width={props.width || 20} height={props.height || 20}>
        <path fill={props.color || '#FF9A4D'} 
            fillRule='evenodd' 
            d='M7.583 8.665c1.417 0 1.584.3 1.584.667 0 .368-.167.666-1.584.666H4.416c-1.416 0-1.583-.334-1.583-.666S3 8.665 4.416 8.665h3.167zm3.746 2.001c0 .737-.596 1.334-1.332 1.334H2a1.333 1.333 0 0 1-1.333-1.334V10c0-.376.157-.717.408-.96a2.66 2.66 0 0 1-.602-1.412L.006 3.77a.935.935 0 0 1 1.106-1.018l2.557.503L5.2.453a.932.932 0 0 1 1.599 0l1.53 2.802 2.553-.503a.935.935 0 0 1 1.114 1.018l-.472 3.858a2.655 2.655 0 0 1-.601 1.412c.251.243.407.584.407.96v.666z'
    />
    </svg>
)

export default SvgFavoriteSolid