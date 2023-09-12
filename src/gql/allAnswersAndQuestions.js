import { gql } from "@apollo/client"

const FrequentAnswersAndQuestions = gql`
  query FrequentAnswersAndQuestions {
    frequentAnswersAndQuestions {
      question
      answer
    }
  }
`

export { FrequentAnswersAndQuestions }
