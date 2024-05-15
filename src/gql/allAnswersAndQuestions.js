import { gql } from "@apollo/client"

const FrequentAnswersAndQuestions = gql`
  query FrequentAnswersAndQuestions($locale: [Locale!]!) {
    frequentAnswersAndQuestions(locales: $locale, last: 2000) {
      question
      answer
    }
  }
`

export { FrequentAnswersAndQuestions }
