
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()

  return (
    <>
    <button onClick={() => {
      navigate('/confetti');
  }}>Go to Confetti Map</button>
    </>
  )

}

export default App
