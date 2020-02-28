export default function GetTimings(screenHeight) {
  let doubleStep = screenHeight * 2;
  let fullStep = screenHeight;
  let halfStep = screenHeight * 0.5;
  let quarterStep = screenHeight * 0.25;

  const introBottomOut = fullStep;
  const introTopOut = introBottomOut + quarterStep;

  const navbarBottomOut = introTopOut;
  const navbarTopIn = navbarBottomOut + quarterStep;

  const aboutBannerIn = navbarTopIn + fullStep;
  const aboutContentIn = aboutBannerIn + doubleStep;
  const aboutOut = aboutContentIn + doubleStep;

  const experienceBannerIn = aboutOut + doubleStep;
  const experienceBannerOut = experienceBannerIn + doubleStep;

  const experienceTimelineIn = experienceBannerOut + fullStep;
  const experienceTimelineTopIn = experienceTimelineIn + halfStep;
  const experienceTimelineMiddleIn = experienceTimelineTopIn + halfStep;
  const experienceTimelineBottomIn = experienceTimelineMiddleIn + halfStep;
  const experienceTimelineOut = experienceTimelineBottomIn + fullStep;

  const contactFormIn = experienceTimelineOut + fullStep;
  const footerIn = contactFormIn + halfStep;
  const pageBottom = footerIn + quarterStep;

  return {
    intro: {
      introBottomOut: introBottomOut,
      introTopOut: introTopOut
    },
    navbar: {
      navbarBottomOut: navbarBottomOut,
      navbarTopIn: navbarTopIn
    },
    about: {
      aboutBannerIn: aboutBannerIn,
      aboutContentIn: aboutContentIn,
      aboutOut: aboutOut
    },
    experience: {
      experienceBannerIn: experienceBannerIn,
      experienceBannerOut: experienceBannerOut,
      experienceTimelineIn: experienceTimelineIn,
      experienceTimelineTopIn: experienceTimelineTopIn,
      experienceTimelineMiddleIn: experienceTimelineMiddleIn,
      experienceTimelineBottomIn: experienceTimelineBottomIn,
      experienceTimelineOut: experienceTimelineOut
    },
    outro: {
      contactFormIn: contactFormIn,
      footerIn: footerIn
    },
    pageBottom: pageBottom
  };
}
