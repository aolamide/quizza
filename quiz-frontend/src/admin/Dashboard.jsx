import React, { useEffect, useState, useCallback } from 'react';
import styles from './admin.module.css';
import API_BASE from '../apiBase';
import { isAuthenticated } from '../auth';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 

const StatBox = ({ figure, name, title, setPage }) => (
  <div onClick={() => setPage(name)} className={styles.statBox}>
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
);
const QuizInfo = ({quiz, setQuiz}) => {
  return (
    <div className={styles.quizModal}>
      <button onClick={() => setQuiz(null)} style={{position : 'absolute', top: '10px', right:'10px', padding:'10px'}}>X</button>
      <p className='bold'>{quiz.name}</p>
      <p>Created by {quiz.creator ? quiz.creator.name : 'UNKNWOWN'} on {new Date(quiz.created).toDateString()}</p>
      <div className={styles.questions}>
        {quiz.questions.map((question, i) => (
        <div key={question._id}>
          <p>{question.title}</p>
          <p>{question.options.map(option => (
            <button style={{display:'block', width :'100%', textAlign:'center', marginBottom:'10px', padding:'8px'}} key={option}>{option}</button>
          ))}</p>
          <p>Correct Answer : {quiz.answers[i]}</p>
        </div>
      ))}
      </div>
    </div>
  )
}


const Users = ({ users, deleteUser }) => {
  return (
    <table className={styles.table}>
      <caption>USERS</caption>
      <thead>
        <tr>
          <td>Name</td>
          <td>Email</td>
          <td>Joined</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {users.map(user =>
        <tr key={user._id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{new Date(user.joined).toDateString()}</td>
          <td>
            <button onClick={() => deleteUser(user)}>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                width="30" height="30"
                viewBox="0 0 172 172"><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{"mixBlendMode": "normal"}}><path d="M0,172v-172h172v172z" fill="none"></path><g><path d="M121.83333,39.41667l-21.5,-21.5h-28.66667l-21.5,21.5h-10.75v100.33333c0,7.88333 6.45,14.33333 14.33333,14.33333h64.5c7.88333,0 14.33333,-6.45 14.33333,-14.33333v-100.33333z" fill="#e74c3c"></path><path d="M39.41667,25.08333h93.16667c3.94167,0 7.16667,3.225 7.16667,7.16667v7.16667h-107.5v-7.16667c0,-3.94167 3.225,-7.16667 7.16667,-7.16667z" fill="#e74c3c"></path><path d="M59.4334,113.18215l43.00036,-43.00186l10.13537,10.13502l-43.00036,43.00186z" fill="#fafafa"></path><path d="M59.43283,80.31878l10.13502,-10.13537l43.00186,43.00036l-10.13502,10.13537z" fill="#fafafa"></path></g></g>
              </svg>
            </button>
          </td>
        </tr>
        )}
      </tbody>
    </table>
  )
}
const Quizzes = ({ quizzess, deleteQuiz, setQuiz }) => {
  return (
    <table className={styles.table}>
      <caption>QUIZZES</caption>
      <thead>
        <tr>
          <td>Name</td>
          <td>Creator</td>
          <td>Creation Date</td>
          <td>Duration</td>
          <td>PrivateBoard</td>
          <td>Taken by</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        {quizzess.map(quiz =>
        <tr key={quiz._id}>
          <td><button style={{color : 'inherit', textDecoration:'underline', fontSize:'inherit'}} onClick={() => setQuiz(quiz)}>{quiz.name}</button></td>
          <td>{quiz.creator ? quiz.creator.name : 'UNKNOWN'}</td>
          <td>{new Date(quiz.created).toDateString()}</td>
          <td>{quiz.duration.min + ' : ' + quiz.duration.sec}</td>
          <td>{String(quiz.privateBoard)}</td>
          <td>{quiz.takenBy.length}</td>
          <td>
            <button onClick={() => deleteQuiz(quiz)}>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                width="30" height="30"
                viewBox="0 0 172 172"><g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{"mixBlendMode": "normal"}}><path d="M0,172v-172h172v172z" fill="none"></path><g><path d="M121.83333,39.41667l-21.5,-21.5h-28.66667l-21.5,21.5h-10.75v100.33333c0,7.88333 6.45,14.33333 14.33333,14.33333h64.5c7.88333,0 14.33333,-6.45 14.33333,-14.33333v-100.33333z" fill="#e74c3c"></path><path d="M39.41667,25.08333h93.16667c3.94167,0 7.16667,3.225 7.16667,7.16667v7.16667h-107.5v-7.16667c0,-3.94167 3.225,-7.16667 7.16667,-7.16667z" fill="#e74c3c"></path><path d="M59.4334,113.18215l43.00036,-43.00186l10.13537,10.13502l-43.00036,43.00186z" fill="#fafafa"></path><path d="M59.43283,80.31878l10.13502,-10.13537l43.00186,43.00036l-10.13502,10.13537z" fill="#fafafa"></path></g></g>
              </svg>
            </button>
          </td>
        </tr>
        )}
      </tbody>
    </table>
  )
}

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [showQuiz, setShowQuiz] = useState(null);
  const [page, setPage] = useState('');
  useEffect(() => {
    fetch(`${API_BASE}/admin/stats`, {
      method : 'GET',
      headers : {
        Authorization : `Bearer ${isAuthenticated().token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) toast.error('Error fetching stats')
      else setStats(data.stats)
    })
    .catch(() => {
      toast.error("Snap! Looks like you're offline")
    })
  }, [users, quizzes]);
  useEffect(() => {
    fetch(`${API_BASE}/users`,{
      headers : {
        Authorization : `Bearer ${isAuthenticated().token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        toast.error(data.error)
      }
      else setUsers(data.sort((a, b) => {
        if(a.joined > b.joined) return -1;
        else if(a.joined < b.joined) return 1;
        return 0;
      }))
    })
    .catch(() => {
      toast.error("Snap! Looks like you're offline")
    })
  }, [])
  useEffect(() => {
    fetch(`${API_BASE}/quizzes`,{
      headers : {
        Authorization : `Bearer ${isAuthenticated().token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        toast.error(data.error)
      }
      else {
        setQuizzes(data.sort((a,b) => {
        if(a.created > b.created) return -1;
        else if(a.created < b.created) return 1;
        return 0;
        }))
      }
    })
    .catch(() => {
      toast.error("Snap! Looks like you're offline")
    })
  }, [])
  let removeUser = useCallback(
    (user) => {
      fetch(`${API_BASE}/admin/user/${user}`, {
        method : 'DELETE',
        headers : {
          Authorization : `Bearer ${isAuthenticated().token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if(data.error) {
          toast.error(data.error)
        }
        else {
          setUsers(users.filter(x => x._id !== user))
          toast.success(data.message)
        }
      })
      .catch(() => {
        toast.error("Snap! Looks like you're offline")
      })
    },
    [users]
  );
  let removeQuiz = useCallback(
    (quiz) => {
      fetch(`${API_BASE}/admin/quiz/${quiz}`, {
        method : 'DELETE',
        headers : {
          Authorization : `Bearer ${isAuthenticated().token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if(data.error) {
          toast.error(data.error)
        }
        else {
          setQuizzes(quizzes.filter(x => x._id !== quiz))
          toast.success(data.message)
        }
      })
      .catch(() => {
        toast.error("Snap! Looks like you're offline")
      })
    },
    [quizzes]
  );
  let deleteItem = useCallback(item => {
    confirmAlert({
      title : 'Confirm to delete',
      message : `Are you sure you want to delete ${item.name}`,
      buttons : [
        {
          label : 'Yes',
          onClick : () => item.duration ? removeQuiz(item._id) : removeUser(item._id)
        },
        {
          label : 'No',
          onClick : () => undefined
        }
      ]
    });
  }, [removeQuiz, removeUser]);
  return (
    <div style={{padding: '20px'}}>
      <div style={{marginTop : '90px', textAlign: 'center', fontSize: '30px', fontWeight : 'bold'}}>
        DASHBOARD
      </div>
      <div className={styles.stats}>
        <StatBox setPage={setPage} name="users" figure={stats.users} title="Registered Users" />
        <StatBox setPage={setPage} name="quizzes" figure={stats.quizzes} title="Quizzes created" />
        <StatBox setPage={setPage} name="taken" figure={stats.timesTaken} title="Quizzes Completed" />
      </div>
      {page ==='users' && <div style={{overflowX : 'auto'}}>
        <Users users={users} deleteUser={deleteItem} />
      </div>}
      {page === 'quizzes' && <div style={{overflowX : 'auto'}}>
        <Quizzes quizzess={quizzes} deleteQuiz={deleteItem} setQuiz={setShowQuiz} />
      </div>}
      {showQuiz && 
      <div style={{position :'fixed', width : '100vw', height : '100vh', zIndex : '3000', backgroundColor:'rgba(255, 255, 255, 0.9)', top : '0', left : '0', display : 'flex', justifyContent:'center'}}>
        <QuizInfo quiz={showQuiz} setQuiz={setShowQuiz} />
      </div>
      }
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
    </div>
  )
}

export default Dashboard;