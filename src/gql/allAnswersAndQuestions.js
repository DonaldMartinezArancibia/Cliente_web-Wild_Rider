import { gql } from "@apollo/client"

const FrequentAnswersAndQuestions = gql`
  query FrequentAnswersAndQuestions($locale: [Locale!]!) {
    frequentAnswersAndQuestions(locales: $locale) {
      question
      answer
    }
  }
`

export { FrequentAnswersAndQuestions }
