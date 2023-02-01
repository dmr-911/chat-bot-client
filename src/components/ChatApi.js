import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Chatbot() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [taskId, setTaskId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   if (taskId) {
  //     setIsLoading(true);
  //     const intervalId = setInterval(async () => {
  //       try {
  //         const result = await axios.get(`/result/${taskId}`);
  //         if (result.data.data) {
  //           setResponse(result.data.data);
  //           clearInterval(intervalId);
  //           setIsLoading(false);
  //         }
  //       } catch (error) {
  //         setError(error);
  //         setIsLoading(false);
  //         clearInterval(intervalId);
  //       }
  //     }, 2000);
  //   }
  // }, [taskId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      setResponse('');
      const res = await axios.post('/chat', { prompt });
      setTaskId(res.data.task_id);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input type="text" value={prompt} onChange={e => setPrompt(e.target.value)} />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      {error && <div>{error.message}</div>}
      <div>
        {response}
      </div>
    </div>
  );
}

export default Chatbot;
