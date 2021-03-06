import React from 'react'

const KeyIcon = props => {
  const styles = {
    svg: { display: 'inline-block', verticalAlign: 'middle' },
  }

  return (
    <svg
      style={styles.svg}
      width={`${props.size}px`}
      height={`${props.size}px`}
      viewBox="0 0 71 75"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs />
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="2.-login-(grey)" transform="translate(-1011.000000, -426.000000)" fill="#FFFFFF" fillRule="nonzero">
          <g id="Group-8" transform="translate(311.000000, 396.000000)">
            <g id="Group-7" transform="translate(668.000000, 0.000000)">
              <g id="key-icon" transform="translate(32.000000, 30.000000)">
                <path
                  d="M20.0493785,57.2393091 L26.3209059,63.6499871 L31.3671539,58.4917747 L25.0956265,52.0810967 L42.382773,34.4103888 C50.2431556,39.7911581 60.8150446,38.1967866 66.8203226,30.7249044 C72.8256007,23.2530222 72.3040226,12.3426037 65.6146641,5.50482394 C58.9253055,-1.33295586 48.2517092,-1.86610646 40.9420121,4.27241465 C33.632315,10.4109358 32.072551,21.2173903 37.336525,29.2521764 L0,67.4171116 L5.04624798,72.575324 L12.3098949,65.1505138 L21.9455876,75 L26.9918356,69.8417876 L17.3680388,59.9923013 L20.0493785,57.2393091 Z M44.6596515,10.6621831 C49.0527807,6.17238413 56.1747478,6.17281841 60.5673529,10.6631531 C64.9599581,15.1534877 64.9599581,22.4334746 60.5673529,26.9238092 C56.1747478,31.4141439 49.0527807,31.4145782 44.6596515,26.9247792 C40.2736503,22.4308934 40.2736503,15.1560689 44.6596515,10.6621831 Z"
                  id="Shape"
                  fill={props.color}
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

export default KeyIcon
