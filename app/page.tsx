
export default function Home() {
  return (
    <main 
      className="flex min-h-screen flex-col items-center justify-center p-24"
      style={{
        backgroundColor: `rgb(var(--color-background))`, // Soft Beige
        color: `rgb(var(--color-foreground))` // Deep Gray Text
      }}
    >
      <h1 className="text-4xl font-bold mb-6">
        Forest Green E-Commerce Project
      </h1>
      {/* Tailwind maps bg-primary to --color-primary variable */}
      <button 
        className="text-white font-semibold py-2 px-4 rounded shadow-lg transition duration-150"
        style={{ backgroundColor: `rgb(var(--color-primary))` }} // Forest Green
      >
        Add to Cart
      </button>
      
      <p className="mt-4" style={{ color: `rgb(var(--color-accent))` }}>
        Sale: 10% Off!
      </p>
    </main>
  );
}
