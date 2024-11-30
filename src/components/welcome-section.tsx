

export function WelcomeSection() {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <img
        src="/hero.png"
        width={300}
        height={400}
        alt="Doctor"
        className="mb-6"
      />
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-2">
          
          <h2 className="text-2xl font-semibold text-gray-900">
            Welcome to Medi-Chain
          </h2>
        </div>
        <p className="text-gray-600 max-w-md">
          "Your health, your control – MediChain simplifies care, secures your records, and connects you to better healthcare anytime, anywhere."
        </p>
      </div>
    </div>
  )
}

