# FullCalendar LWC test

Run `install-scratch.sh` to setup a scratch org with the test component.
The install script will open a browser with a Lightning tab.

## With Lightning Locker

The FullCalendar library will not load:

![Locker error](gfx/locker-error.png)

## With Locker Web Security

Enable **Locker Web Security (beta)** in Setup > Session Settings

Refresh the Lightning tab with the test component.
Notice that the component renders correctly.

![LWS](gfx/lws.png)
