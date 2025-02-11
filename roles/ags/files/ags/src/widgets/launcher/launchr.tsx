import Apps from 'gi://AstalApps';
import { App, Astal, Gdk, Gtk } from 'astal/gtk3';
import { Variable } from 'astal';

import css from './launcher.module.scss';
import { Scrollable, Window } from 'astal/gtk3/widget';

const MAX_ITEMS = 10;

function hide() {
  App.get_window('launcher')!.hide();
}

function AppButton({ app }: { app: Apps.Application }) {
  const handleClick = () => {
    hide();
    app.launch();
  };

  return (
    <button className={css.application} onClicked={handleClick}>
      <box>
        <icon icon={app.iconName} />
        <box valign={Gtk.Align.CENTER} vertical>
          <label className="name" truncate xalign={0} label={app.name} />
          {app.description && <label className="description" wrap xalign={0} label={app.description} />}
        </box>
      </box>
    </button>
  );
}

export function Launcher() {
  const { CENTER } = Gtk.Align;

  const applications = new Apps.Apps();

  const width = Variable(1000);
  const text = Variable('');

  const list = text((text) => applications.fuzzy_query(text).slice(0, MAX_ITEMS));

  const handleActivateSearch = () => {
    applications.fuzzy_query(text.get())?.[0].launch();
    hide();
  };

  const handleShowWindow = (self: Window) => {
    text.set('');
    width.set(self.get_current_monitor().workarea.width);
  };

  const handleKeyPressEvent = (self: Window, event: Gdk.Event) => {
    if (event.get_keyval()[1] === Gdk.KEY_Escape) self.hide();
  };

  return (
    <window
      name="launcher"
      exclusivity={Astal.Exclusivity.IGNORE}
      keymode={Astal.Keymode.ON_DEMAND}
      anchor={Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT | Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM}
      application={App}
      visible={false}
      onShow={handleShowWindow}
      onKeyPressEvent={handleKeyPressEvent}
      className={css.launcher}
    >
      <box>
        <eventbox expand onClick={hide} />
        <box hexpand={false} vertical>
          <eventbox heightRequest={100} onClick={hide} />
          <box widthRequest={500} className="Applauncher" vertical>
            <entry
              placeholderText="Search"
              text={text()}
              onChanged={(self) => text.set(self.text)}
              onActivate={handleActivateSearch}
            />
            <box spacing={6} vertical>
              {list.as((list) => list.map((app) => <AppButton app={app} />))}
            </box>
            <box halign={CENTER} className="not-found" vertical visible={list.as((l) => l.length === 0)}>
              <icon icon="system-search-symbolic" />
              <label label="No match found" />
            </box>
          </box>
          <eventbox expand onClick={hide} />
        </box>
        <eventbox expand onClick={hide} />
      </box>
    </window>
  );
}
