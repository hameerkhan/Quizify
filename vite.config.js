import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
const topics = [
  {
    name: 'Topic 1',
    questions: [
      {
        question: 'What is the capital of France?',
        options: ['Berlin', 'Madrid', 'Paris', 'Lisbon'],
        correctAnswer: 2,
        explanation: 'Paris is the capital of France.'
      },
      // Add more questions here
    ]
  },
  // Add more topics here
];
// 
