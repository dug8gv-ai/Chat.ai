const dailyQuestions = [
  "What should AI never automate?",
  "How can AI improve your local community?",
  "When should humans overrule AI?",
  "Which tone do you prefer from AI today?",
  "Share one idea to reduce bias in AI outputs."
];

export default function HomePage() {
  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "2rem 1rem" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>Chat.ai</h1>
      <p style={{ opacity: 0.85, marginTop: 0 }}>Web3 social AI platform where every interaction trains better AI.</p>

      <section style={{ border: "1px solid #2a3140", borderRadius: 12, padding: 16, marginTop: 20 }}>
        <h2 style={{ marginTop: 0 }}>Daily 5 Questions</h2>
        <ul>
          {dailyQuestions.map((question) => (
            <li key={question}>{question}</li>
          ))}
        </ul>
      </section>

      <section style={{ border: "1px solid #2a3140", borderRadius: 12, padding: 16, marginTop: 20 }}>
        <h2 style={{ marginTop: 0 }}>AI Feedback Controls</h2>
        <p>Users can upvote/downvote, select tone (friendly/professional/concise/funny), challenge AI, and submit corrections.</p>
      </section>
    </main>
  );
}
