import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Pages/Root";
import QuizCreate from "./Pages/QuizCreate";
import QuizMaker from "./Pages/QuizMaker";
import TakeQuiz from "./Pages/TakeQuiz";
import ShowQuiz from "./Pages/ShowQuiz";
import "./app.css";
import ViewScore from "./Pages/ViewScore";

function App() 
{
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Root />
      },
      {
        path: "/home",
        element: <Root />
      },
      {
        path: "/quiz/create",
        element: <QuizCreate/>
      },
      {
        path: "/quiz/view",
        element: <ShowQuiz />
      },
      {
        path: "/quiz/questions",
        element: <QuizMaker />
      },
      {
        path: "/quiz/take/:quizId",
        element: <TakeQuiz />
      },
      {
        path: "/quiz/score",
        element: <ViewScore />
      }
    ],
    {
      future: {
        v7_startTransition: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod:   true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
        v7_relativeSplatPath: true,
      },
    }
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
