import React from 'react'


const Activity = (props) => {
  return(
    <main className="mw6 center">
      <article className="dt w-100 bb b--black-05 pb2 mt2" href="#0">
        <div className="dtc w2 w3-ns v-mid">
          <img src={props.image} className="ba b--black-10 db br-100 w2 h2 w3-ns h3-ns"
            alt='activity-detail.jpg'/>
        </div>
        <div className="dtc v-mid pl3">
          <h1 className="f6 f5-ns fw6 lh-title black mv0">{props.label}</h1>
          <h2 className="f6 fw4 mt0 mb0 black-60">{props.value} Parker points!</h2>
        </div>
        <div className="dtc v-mid">
          <div className="w-100 tr">

            <button
              className="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60"
              onClick={props.onClick}
              type="submit">+ This One!</button>

          </div>
        </div>
      </article>
    </main>
  )
}


export default Activity
