import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Login from "./components/Login/Login.js";
import PrivateWrapper from "./components/PrivateWrapper/PrivateWrapper.js";
import { _getUsers, _getQuestions } from "./_DATA.js";
import { store } from "./state/store/store.js";
import { getUsersData, getQuestionsData } from "./state/action/action.js";
import Dashboard from "./components/Dashboard/Dashboard.js";
import AppLayout from "./components/AppLayout/AppLayout.js";
import Leader from "./components/Leader/Leader.js";
import NewPoll from "./components/NewPoll/NewPoll.js";
import AnswerPoll from "./components/AnswerPoll/AnswerPoll.js";

function App() {
  const getAppData = async () => {
    const [users, questions] = await Promise.all([
      _getUsers(),
      _getQuestions(),
    ]);
    store.dispatch(getUsersData(users));
    store.dispatch(getQuestionsData(questions));
  };

  useEffect(() => {
    getAppData();
  }, []);

  return (
    <AppLayout>
      <Routes>
        <Route element={<PrivateWrapper />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="leaderboard" element={<Leader />} />
          <Route path="add" element={<NewPoll />} />
          <Route path={"question/:id"} element={<AnswerPoll />}/>
        </Route>
        <Route path={"login"} element={<Login />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
