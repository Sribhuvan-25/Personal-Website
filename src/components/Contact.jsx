import { usePersonalInfo } from "../hooks/useContent"

const Contact = () => {
  const { data: personalInfo, isLoading, error } = usePersonalInfo();

  // Show loading state
  if (isLoading) {
    return (
      <div className="pb-20">
        <h2 className="my-10 text-center text-4xl">Get in Touch</h2>
        <div className="text-center tracking-tighter">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="pb-20">
        <h2 className="my-10 text-center text-4xl">Get in Touch</h2>
        <div className="text-center tracking-tighter">
          <div className="text-lg text-red-500">Error loading content</div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <h2 className="my-10 text-center text-4xl">Get in Touch</h2>
      <div className="text-center tracking-tighter">
        <p className="my-4">{personalInfo?.contact?.email || "contact@example.com"}</p>
      </div>
    </div>
  )
}

export default Contact
