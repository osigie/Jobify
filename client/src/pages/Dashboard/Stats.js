



import { useEffect } from 'react'
import { useAppContext } from '../../context/AppContext'
import { StatsComponent, Loading, ChartContainer } from '../../components/index'

const Stats = () => {
  const { showStats, isLoading, monthlyApplications } = useAppContext()

  useEffect(() => {
    showStats()
    // eslint-disable-next-line
  }, [])

  if (isLoading) {
    return <Loading center />
  }
  return (
    <>
      <StatsComponent />
      {monthlyApplications.length > 0 && <ChartContainer />}
    </>
  )
}

export default Stats
