gsap.from('.first', {y: -40, duration: 1})
gsap.from('.item', {opacity: 0, stagger: .7})
gsap.from('.planOne', {x: -100, duration: 3, ease: 'power3'})
gsap.from('.planTwo', {x: 100, duration: 3, ease: 'power3'})
gsap.fromTo('.img', {opacity: 0, scale: 0}, {duration: 2, delay: 2, opacity: 1, scale: 1})
gsap.fromTo('.bewer', {opacity: 0, scale: 0}, {duration: 2, delay: 2, opacity: 1, scale: 1, ease: 'bounce', stagger: 1.8})

// hamburger menü öffnen/schließen
const hamburgerBtn = document.getElementById('hamburgerBtn')
const navLinks = document.getElementById('navLinks')

hamburgerBtn.addEventListener('click', () => {
    const istOffen = navLinks.classList.toggle('active')
    hamburgerBtn.classList.toggle('active')
    hamburgerBtn.setAttribute('aria-expanded', istOffen)
})

// Menü automatisch schließen, wenn ein Link angeklickt wird
navLinks.querySelectorAll('.item').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active')
        hamburgerBtn.classList.remove('active')
        hamburgerBtn.setAttribute('aria-expanded', 'false')
    })
})

// Buchungsformular: Auto-Vorauswahl per URL-Parameter + dynamische Preisanzeige
const autoSelect = document.getElementById('auto')
const preisAnzeige = document.getElementById('preisAnzeige')
const buchungsForm = document.getElementById('buchungsForm')

if (autoSelect) {
    const urlParams = new URLSearchParams(window.location.search)
    const vorausgewaehltesAuto = urlParams.get('auto')
    if (vorausgewaehltesAuto) {
        autoSelect.value = vorausgewaehltesAuto
    }

    const preisAktualisieren = () => {
        const gewaehlteOption = autoSelect.options[autoSelect.selectedIndex]
        const preis = gewaehlteOption ? gewaehlteOption.dataset.price : null
        preisAnzeige.textContent = preis ? `Preis: ab ${preis} Euro/Std.` : ''
    }

    autoSelect.addEventListener('change', preisAktualisieren)
    preisAktualisieren()
}

if (buchungsForm) {
    buchungsForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const name = document.getElementById('name').value
        const email = document.getElementById('email').value
        const telefon = document.getElementById('telefon').value
        const gewaehlteOption = autoSelect.options[autoSelect.selectedIndex]
        const autoName = gewaehlteOption ? gewaehlteOption.dataset.name : ''

        const betreff = `Buchungsanfrage: ${autoName}`
        const nachricht =
            `Name: ${name}\n` +
            `E-Mail: ${email}\n` +
            `Telefon: ${telefon}\n` +
            `Gewünschtes Auto: ${autoName}`

        const mailtoLink = `mailto:info@retro-dreams-fake.de?subject=${encodeURIComponent(betreff)}&body=${encodeURIComponent(nachricht)}`
        window.location.href = mailtoLink
    })
}