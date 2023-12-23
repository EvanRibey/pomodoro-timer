# :tomato: Pomodoro Timer

A small web-based Pomodoro timer built using ReactJS, Typescript, and some components from the MUI library. It will create a countdown for each pomodoro and will wrap up the interval with a sound effect notifying the user that the next interval is about to begin.

## Features
- Standard functionality for a pomodoro timer, focus for 25 minutes, break for 5 minutes, and after 4 focus timers, breaking for 15 minutes
  - Includes an onscreen timer and a sand hourglass-like visual showcasing how much time is left in each pomodoro
  - Also includes the live timer and type of pomodoro in the title bar
  - The timer automatically moves forward to the next pomodoro with a "3..2..1" countdown sound effect
- Includes an option for a "long" pomodoro timer which doubles the focus time to 50 minutes, the break to 10 minutes, and the long break timer to 30 minutes
- A todo list manager to keep track of any tasks within the application. The list also persists on visits, so coming back to the page or refreshing keeps your tasks
- A mini-player for lofi music that plays from the "3 Am. Study Session" album with pause/play functionality and song credits
  - I will probably include more albums in the future to randomize based on the month, or look to include the live lofi videos

## Personal Comments

My partner mentioned using pomodoro timers to help her focus on tasks, and I wanted to see if I could program one (even if there are many of these on the internet). Coming from some more experience working with React, I wanted to see if I could flex my skills with my own project while adding Typescript on so that I can practice. Plus in the developer mindset I wanted to see if I could build something relatively in the way that I would want to use it.

Overall I'm very happy with how this came out in such a short period of time. It was fun to play around with the sound effects/music as well as `Audio` was something that I haven't personally worked with before.
