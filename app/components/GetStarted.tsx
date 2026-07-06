import Button from "./Button";

export default function GetStarted() {
  return (
    
<section className="px-6 py-24 text-center">
        <h2 className="font-serif text-5xl">Ready to get started?</h2>

        <p className="mx-auto mt-6 max-w-xl text-lg text-ink/70">
          Submit an booking request and let's see what's possible.
        </p>

        <div className="mt-10">

          <Button href="/#booking" variant="secondary">
              Start a Booking
          </Button>
          
        </div>
      </section>
      
  );
}