/**
 * DementiaGuard - Shared JavaScript
 *
 * Handles:
 *   1. Expandable sections (expandable-trigger / scenario-trigger)
 *   2. Hash fragment deep-linking on page load
 *   3. Hamburger menu open/close
 *   4. Smooth scroll for same-page anchor links
 *
 * No dependencies. No framework. Vanilla JS only.
 */

document.addEventListener('DOMContentLoaded', function () {

  // -----------------------------------------------------------------------
  // 1. EXPANDABLE SECTIONS
  //
  // Any element with [aria-expanded] acts as a toggle trigger.
  // The next sibling element is the collapsible content panel.
  // CSS handles the max-height transition via the .open class.
  // -----------------------------------------------------------------------

  /**
   * Toggle a single expandable trigger open or closed.
   * @param {Element} trigger - element with [aria-expanded]
   */
  function toggleExpandable(trigger) {
    var isExpanded = trigger.getAttribute('aria-expanded') === 'true';
    var content = trigger.nextElementSibling;

    if (!content) return;

    if (isExpanded) {
      // Collapse
      trigger.setAttribute('aria-expanded', 'false');
      trigger.classList.remove('active');
      content.classList.remove('open');
    } else {
      // Expand
      trigger.setAttribute('aria-expanded', 'true');
      trigger.classList.add('active');
      content.classList.add('open');
    }
  }

  // Attach listeners to every element that has aria-expanded.
  // This covers both .expandable-trigger and .scenario-trigger without
  // needing separate selectors.
  var triggers = document.querySelectorAll('[aria-expanded]');

  triggers.forEach(function (trigger) {
    // Skip the hamburger button -- it is handled separately below.
    if (trigger.classList.contains('hamburger')) return;

    trigger.addEventListener('click', function () {
      toggleExpandable(trigger);
    });

    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); // prevent page scroll on Space
        toggleExpandable(trigger);
      }
    });
  });


  // -----------------------------------------------------------------------
  // 2. HASH FRAGMENT DEEP-LINKING
  //
  // On page load, if the URL contains a hash (e.g. #ios), find that element,
  // walk up to its .expandable or .scenario container, open it, then scroll.
  // -----------------------------------------------------------------------

  function expandByHash(hash) {
    if (!hash) return;

    // Strip the leading '#'
    var id = hash.replace(/^#/, '');
    var target = document.getElementById(id);

    if (!target) return;

    // Walk ancestors to find the containing expandable/scenario block.
    var container = target.closest('.expandable, .scenario');

    if (!container) {
      // The target itself might be a section heading at the top level --
      // just scroll to it without trying to expand anything.
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }

    // Find the trigger inside the container (first child with [aria-expanded]
    // that is NOT the hamburger).
    var trigger = container.querySelector('[aria-expanded]');

    if (trigger && trigger.getAttribute('aria-expanded') !== 'true') {
      trigger.setAttribute('aria-expanded', 'true');
      trigger.classList.add('active');

      var content = trigger.nextElementSibling;
      if (content) {
        content.classList.add('open');
      }
    }

    // Scroll to the container (not the inner target) so the trigger header
    // is visible at the top of the viewport.
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  expandByHash(window.location.hash);


  // -----------------------------------------------------------------------
  // 3. HAMBURGER MENU
  //
  // Toggles .nav-open on the parent <header> and aria-expanded on the button.
  // Closes on: any nav link click, window resize above 768px.
  // -----------------------------------------------------------------------

  var hamburger = document.querySelector('.hamburger');

  if (hamburger) {
    var header = hamburger.closest('header');

    /** Open or close the mobile nav. */
    function closeMobileNav() {
      if (header) header.classList.remove('nav-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }

    function toggleMobileNav() {
      var isOpen = header && header.classList.contains('nav-open');

      if (isOpen) {
        closeMobileNav();
      } else {
        if (header) header.classList.add('nav-open');
        hamburger.setAttribute('aria-expanded', 'true');
      }
    }

    hamburger.addEventListener('click', toggleMobileNav);

    // Close when any nav link is clicked (mobile navigation).
    var navLinks = document.querySelectorAll('header nav a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        closeMobileNav();
      });
    });

    // Close if the viewport is resized above the mobile breakpoint.
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        closeMobileNav();
      }
    });
  }


  // -----------------------------------------------------------------------
  // 4. SMOOTH SCROLL FOR SAME-PAGE ANCHOR LINKS
  //
  // Intercepts clicks on <a href="#..."> that resolve to an element on
  // this page and scrolls smoothly instead of jumping.
  // The hash-fragment deep-linking (section 2) handles page load; this
  // handles in-page navigation after load.
  // -----------------------------------------------------------------------

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');

    if (!link) return;

    var href = link.getAttribute('href');
    if (!href || href === '#') return;

    var targetId = href.replace(/^#/, '');
    var targetEl = document.getElementById(targetId);

    if (!targetEl) return;

    // Let the browser update the URL hash normally, but control the scroll.
    e.preventDefault();
    history.pushState(null, '', href);

    // If the target lives inside an expandable/scenario container, open it.
    var container = targetEl.closest('.expandable, .scenario');
    if (container) {
      var trigger = container.querySelector('[aria-expanded]');
      if (trigger && trigger.getAttribute('aria-expanded') !== 'true') {
        trigger.setAttribute('aria-expanded', 'true');
        trigger.classList.add('active');
        var content = trigger.nextElementSibling;
        if (content) content.classList.add('open');
      }
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

});
