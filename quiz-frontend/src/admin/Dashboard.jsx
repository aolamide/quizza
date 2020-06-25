import React, { useEffect, useState } from 'react';
import styles from './admin.module.css';
import API_BASE from '../apiBase';
import { isAuthenticated } from '../auth';


const StatBox = ({ figure, name, title }) => (
  <div className={styles.statBox}>
    <div className={styles.statInner}>
{ name === 'taken' && <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTc4LjgzMzMzLDExNy41MzMzM2wtMzMuNjgzMzMsLTMzLjY4MzMzbDEwLjAzMzMzLC0xMC4wMzMzM2wyMy42NSwyMy42NWw2MC4yLC02MC4yYy0xMy42MTY2NywtMTMuNjE2NjcgLTMyLjI1LC0yMi45MzMzMyAtNTMuMDMzMzMsLTIyLjkzMzMzYy0zOS40MTY2NywwIC03MS42NjY2NywzMi4yNSAtNzEuNjY2NjcsNzEuNjY2NjdjMCwzOS40MTY2NyAzMi4yNSw3MS42NjY2NyA3MS42NjY2Nyw3MS42NjY2N2MzOS40MTY2NywwIDcxLjY2NjY3LC0zMi4yNSA3MS42NjY2NywtNzEuNjY2NjdjMCwtMTMuNjE2NjcgLTMuNTgzMzMsLTI1LjggLTEwLjAzMzMzLC0zNi41NXoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="/> }
    {name === 'users' && <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTg2LDM1LjgzMzMzYy0xMS43ODkyNCwwIC0yMS41LDkuNzEwNzYgLTIxLjUsMjEuNWMwLDExLjc4OTI0IDkuNzEwNzYsMjEuNSAyMS41LDIxLjVjMTEuNzg5MjQsMCAyMS41LC05LjcxMDc2IDIxLjUsLTIxLjVjMCwtMTEuNzg5MjQgLTkuNzEwNzYsLTIxLjUgLTIxLjUsLTIxLjV6TTM1LjgzMzMzLDUwLjE2NjY3Yy03LjkxNjA4LDAgLTE0LjMzMzMzLDYuNDE3MjUgLTE0LjMzMzMzLDE0LjMzMzMzYzAsNy45MTYwOCA2LjQxNzI1LDE0LjMzMzMzIDE0LjMzMzMzLDE0LjMzMzMzYzcuOTE2MDgsMCAxNC4zMzMzMywtNi40MTcyNSAxNC4zMzMzMywtMTQuMzMzMzNjMCwtNy45MTYwOCAtNi40MTcyNSwtMTQuMzMzMzMgLTE0LjMzMzMzLC0xNC4zMzMzM3pNMTM2LjE2NjY3LDUwLjE2NjY3Yy03LjkxNjA4LDAgLTE0LjMzMzMzLDYuNDE3MjUgLTE0LjMzMzMzLDE0LjMzMzMzYzAsNy45MTYwOCA2LjQxNzI1LDE0LjMzMzMzIDE0LjMzMzMzLDE0LjMzMzMzYzcuOTE2MDgsMCAxNC4zMzMzMywtNi40MTcyNSAxNC4zMzMzMywtMTQuMzMzMzNjMCwtNy45MTYwOCAtNi40MTcyNSwtMTQuMzMzMzMgLTE0LjMzMzMzLC0xNC4zMzMzM3pNMzUuODMzMzMsOTMuMTY2NjdjLTE1LjY1OTE3LDAgLTI4LjY2NjY3LDYuNTEzMDUgLTI4LjY2NjY3LDE1Ljg4NzA1djEyLjc3OTYyaDIxLjV2LTUuNjEyOTVjMCwtOC45OTQxNyAzLjc3NjcyLC0xNi43NjU0MSAxMC40NTYwNSwtMjIuODg1NzRjLTEuMDg5MzMsLTAuMDY0NSAtMi4xNjQyMiwtMC4xNjc5NyAtMy4yODkzOSwtMC4xNjc5N3pNODYsOTMuMTY2NjdjLTI1LjMxMjY3LDAgLTQzLDkuNDgwMDUgLTQzLDIzLjA1MzcxdjE5Ljk0NjI5aDg2di0xOS45NDYyOWMwLC0xMy41NzM2NyAtMTcuNjg3MzMsLTIzLjA1MzcxIC00MywtMjMuMDUzNzF6TTEzNi4xNjY2Nyw5My4xNjY2N2MtMS4xMjUxNywwIC0yLjIwMDA1LDAuMTAzNDcgLTMuMjg5MzksMC4xNjc5N2M2LjY3OTMzLDYuMTIwMzMgMTAuNDU2MDUsMTMuODk4NzQgMTAuNDU2MDUsMjIuODg1NzR2NS42MTI5NWgyMS41di0xMi43Nzk2MmMwLC05LjM3NCAtMTMuMDA3NSwtMTUuODg3MDUgLTI4LjY2NjY3LC0xNS44ODcwNXoiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg=="/>}
    {name === 'quizzes' && <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNDgiIGhlaWdodD0iNDgiCnZpZXdCb3g9IjAgMCAxNzIgMTcyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE3MnYtMTcyaDE3MnYxNzJ6IiBmaWxsPSJub25lIj48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTQzLDE0LjMzMzMzYy03LjkwNDgzLDAgLTE0LjMzMzMzLDYuNDI4NSAtMTQuMzMzMzMsMTQuMzMzMzN2Ny4xNjY2N2gtNy4xNjY2N2MtMy45NTYsMCAtNy4xNjY2NywzLjIxMDY3IC03LjE2NjY3LDcuMTY2NjdjMCwzLjk1NiAzLjIxMDY3LDcuMTY2NjcgNy4xNjY2Nyw3LjE2NjY3aDcuMTY2Njd2MTQuMzMzMzNoLTcuMTY2NjdjLTMuOTU2LDAgLTcuMTY2NjcsMy4yMTA2NyAtNy4xNjY2Nyw3LjE2NjY3YzAsMy45NTYgMy4yMTA2Nyw3LjE2NjY3IDcuMTY2NjcsNy4xNjY2N2g3LjE2NjY3djE0LjMzMzMzaC03LjE2NjY3Yy0zLjk1NiwwIC03LjE2NjY3LDMuMjEwNjcgLTcuMTY2NjcsNy4xNjY2N2MwLDMuOTU2IDMuMjEwNjcsNy4xNjY2NyA3LjE2NjY3LDcuMTY2NjdoNy4xNjY2N3YxNC4zMzMzM2gtNy4xNjY2N2MtMy45NTYsMCAtNy4xNjY2NywzLjIxMDY3IC03LjE2NjY3LDcuMTY2NjdjMCwzLjk1NiAzLjIxMDY3LDcuMTY2NjcgNy4xNjY2Nyw3LjE2NjY3aDcuMTY2Njd2Ny4xNjY2N2MwLDcuOTA0ODMgNi40Mjg1LDE0LjMzMzMzIDE0LjMzMzMzLDE0LjMzMzMzaDg2YzcuOTA0ODMsMCAxNC4zMzMzMywtNi40Mjg1IDE0LjMzMzMzLC0xNC4zMzMzM3YtMTE0LjY2NjY3YzAsLTcuOTA0ODMgLTYuNDI4NSwtMTQuMzMzMzMgLTE0LjMzMzMzLC0xNC4zMzMzM3pNNTcuMzMzMzMsNDNoNTcuMzMzMzN2MjEuNWgtNTcuMzMzMzN6TTU3LjMzMzMzLDc4LjgzMzMzaDU3LjMzMzMzdjE0LjMzMzMzaC01Ny4zMzMzM3pNNTcuMzMzMzMsMTA3LjVoNTcuMzMzMzN2MTQuMzMzMzNoLTU3LjMzMzMzeiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"/>}
      <div className={styles.statMain}>
        <span className={styles.statName}>{title}</span>
        <span className={styles.statFigure}>{figure}</span>
      </div>
    </div>
  </div>
)

const Dashboard = () => {
  const [error, setError] = useState('');
  const [stats, setStats] = useState({});
  useEffect(() => {
    setError('')
    fetch(`${API_BASE}/admin/stats`, {
      method : 'GET',
      headers : {
        'Content-Type' : 'application/json',
        Accept : 'application/json',
        Authorization : `Bearer ${isAuthenticated().token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) setError('Error occured')
      else setStats(data.stats)
    })
  }, [])
  return (
    <div style={{padding: '20px'}}>
      <div style={{marginTop : '90px', fontSize: '20px', fontWeight : 'bold'}}>
        DASHBOARD
      </div>
      <div className={styles.stats}>
        <StatBox name="users" figure={stats.users} title="Registered Users" />
        <StatBox name="quizzes" figure={stats.quizzes} title="Quizzes created" />
        <StatBox name="taken" figure={stats.timesTaken} title="Times quizzes taken" />
      </div>
      { error && <div>{error}</div>}
    </div>
  )
}

export default Dashboard;