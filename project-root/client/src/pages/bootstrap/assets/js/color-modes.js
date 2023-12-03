/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  'use strict' 

  const getStoredTheme = () => localStorage.getItem('theme') // get the stored theme from localStorage
  const setStoredTheme = theme => localStorage.setItem('theme', theme) // store the theme in localStorage

  const getPreferredTheme = () => { 
    const storedTheme = getStoredTheme() 
    if (storedTheme) { 
      return storedTheme 
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' // if no theme is stored, return the preferred theme
  }

  const setTheme = theme => {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme) // set the theme attribute on the <html> element to the passed theme value (e.g. "dark")
    }
  }

  setTheme(getPreferredTheme()) // set the theme on page load to the preferred theme (e.g. "dark")

  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector('#bd-theme')

    if (!themeSwitcher) {
      return
    }

    const themeSwitcherText = document.querySelector('#bd-theme-text') // text of the theme switcher button (e.g. "Dark Mode") 
    const activeThemeIcon = document.querySelector('.theme-icon-active use') // the <use> element of the active theme icon
    const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`) // the button to activate (e.g. the "Dark Mode" button)
    const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href') // the <use> element of the active button's icon (e.g. the <use> element of the "Dark Mode" button's icon)


    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
      element.classList.remove('active')
      element.setAttribute('aria-pressed', 'false')
    })

    btnToActive.classList.add('active') // add the "active" class to the button to activate
    btnToActive.setAttribute('aria-pressed', 'true') // set the "aria-pressed" attribute of the button to activate to "true"
    activeThemeIcon.setAttribute('href', svgOfActiveBtn) // set the "href" attribute of the active theme icon to the <use> element of the active button's icon
    const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})` // the label of the theme switcher button (e.g. "Dark Mode (dark)")
    themeSwitcher.setAttribute('aria-label', themeSwitcherLabel) // set the "aria-label" attribute of the theme switcher button to the theme switcher label
    


    if (focus) {
      themeSwitcher.focus()
    }
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { // listen for changes to the preferred theme
    const storedTheme = getStoredTheme() // get the stored theme from localStorage
    if (storedTheme !== 'light' && storedTheme !== 'dark') { // if the stored theme is not "light" or "dark" (e.g. "auto")
      setTheme(getPreferredTheme()) // set the theme to the preferred theme (e.g. "dark")
    }
  })

  window.addEventListener('DOMContentLoaded', () => { // when the page loads 
    showActiveTheme(getPreferredTheme()) // show the active theme (e.g. "dark")

    document.querySelectorAll('[data-bs-theme-value]') // get all of the theme toggles
      .forEach(toggle => { // for each theme toggle
        toggle.addEventListener('click', () => { // listen for clicks on the theme toggle buttons 
          const theme = toggle.getAttribute('data-bs-theme-value') // get the theme value of the clicked theme toggle button (e.g. "dark")
          setStoredTheme(theme) // store the theme in localStorage 
          setTheme(theme) // set the theme (e.g. "dark")
          showActiveTheme(theme, true) // show the active theme (e.g. "dark")
        })
      })
  })
})()




