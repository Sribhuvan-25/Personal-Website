// Fade-up on scroll — once per section, 80ms stagger (spec §1: motion).

const sections = Array.from(document.querySelectorAll('.reveal'))

const reveal = (section) => {
  Array.from(section.children).forEach((child, i) => {
    child.style.setProperty('--stagger', `${i * 80}ms`)
  })
  section.classList.add('is-visible')
}

const supported =
  'IntersectionObserver' in window &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Only hide content once we know we can bring it back.
if (supported) {
  document.documentElement.classList.add('js-reveal')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        reveal(entry.target)
        observer.unobserve(entry.target)
      })
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
  )

  sections.forEach((section) => observer.observe(section))

  // If the tab never rendered (backgrounded or prerendered), the observer may
  // not have fired. Reveal whatever is actually in view so nothing sits blank.
  const revealInView = () => {
    // A tab that has never rendered reports no viewport; in that case there is
    // no meaningful "in view", so reveal everything rather than leave it blank.
    const laidOut = window.innerHeight > 0

    sections.forEach((section) => {
      if (section.classList.contains('is-visible')) return
      const box = section.getBoundingClientRect()
      const inView = !laidOut || (box.top < window.innerHeight && box.bottom > 0)
      if (inView) {
        reveal(section)
        observer.unobserve(section)
      }
    })
  }

  window.addEventListener('load', revealInView, { once: true })
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) revealInView()
  })
}
