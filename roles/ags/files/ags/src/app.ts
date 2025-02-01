import { App, Gtk } from 'astal/gtk3';

import { hyprland } from './utils/hyprland';
import { Bar } from './widgets/bar/bar';

let secondMonitorWidget: Gtk.Widget | null = null;

hyprland.connect('monitor-added', () => {
  secondMonitorWidget = Bar({ monitor: 1 });
});

hyprland.connect('monitor-removed', () => {
  secondMonitorWidget?.destroy();
  secondMonitorWidget = null;
});

App.start({
  css: './styles.css',
  main() {
    Bar({ monitor: 0 });

    if (App.get_monitors().length > 1) {
      secondMonitorWidget = Bar({ monitor: 1 });
    }
  },
});
