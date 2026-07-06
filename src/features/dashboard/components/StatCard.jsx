import '../dashboard.css'

function StatCard({title,value}) {
  return (
     <article className="statCard">
      <span>{title}</span>
      <strong>{value}</strong>
    </article>
  )
}

export default StatCard