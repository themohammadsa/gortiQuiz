import { Search } from '../../pages/search/Search';
import { Route, Routes } from 'react-router-dom';
import { Home } from "../../pages/home/Home"
import { Quiz } from '../../pages/quiz/Quiz';
import { QuizData } from "../../pages/quiz/QuizData"
import { ResultData } from '../../pages/result/ResultData';
import { Result } from '../../pages/result/Result';
import { Login } from '../../pages/login/Login';
import { SignUp } from '../../pages/signUp/SignUp';
import { PrivateRoute } from './PrivateRoute';

export const Router = () => {
    return (
        <>
            <Routes >
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />

                <PrivateRoute path='/' element={<Home />} />
                <PrivateRoute path='/quiz' element={<Quiz />} />
                <PrivateRoute path='/quiz/:selectedQuiz' element={<QuizData />} />
                <PrivateRoute path='/result' element={<Result />} />
                <PrivateRoute path='/result/:selectedQuiz/' element={<ResultData />} />
                <PrivateRoute path='/search/:search/' element={<Search />} />

            </Routes>
        </>
    )
}