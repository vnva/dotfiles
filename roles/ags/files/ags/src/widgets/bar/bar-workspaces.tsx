import Hyprland from 'gi://AstalHyprland';
import { hyprland } from '../../utils/hyprland';
import { bind } from 'astal';
import { NERD_ICON, NerdIcon } from '../../utils/constants';

import css from './bar.module.scss';

function getClientIcon(client: Hyprland.Client): NerdIcon {
  if (client.class === 'org.telegram.desktop') return 'TELEGRAM';
  else if (/Visual Studio Code$/.test(client.title)) return 'VSCODE';
  else if (client.class.endsWith('ghostty')) return 'GHOSTTY';
  else if (client.class === 'google-chrome') return 'CHROME';
  else if (client.class === 'spotify') return 'SPOTIFY';
  else if (client.class === 'com.obsproject.Studio' || client.class === 'swappy') return 'SCREEN_CAPTURE';

  return 'WINDOW';
}

function WorkspaceButton(workspace: Hyprland.Workspace) {
  const className = bind(hyprland, 'focusedWorkspace').as((focusedWorkspace) => {
    if (!focusedWorkspace) return css.barWorkspacesItem;

    const classes = [css.barWorkspacesItem];
    if (focusedWorkspace.id === workspace.id) classes.push(css.barWorkspacesItemFocused);

    return classes.join(' ');
  });

  const label = bind(hyprland, 'clients').as((clients) => {
    const icons = [];

    for (const client of clients) {
      if (!client.workspace || client.workspace.id !== workspace.id) continue;
      icons.push(NERD_ICON[getClientIcon(client)].N);
    }

    if (!icons.length) return workspace.id.toString();

    return `${workspace.id}  ${icons.join('  ')} `;
  });

  const handleSelectWorkspace = () => hyprland.message_async(`dispatch workspace ${workspace.id}`, null);

  return (
    <button className={className} onClicked={handleSelectWorkspace} cursor="pointer">
      <label label={label} />
    </button>
  );
}

interface WorkspacesProps {
  monitor: number;
}

export function BarWorkspaces(props: WorkspacesProps) {
  const { monitor } = props;

  return (
    <box className={css.barWorkspaces} spacing={5}>
      {bind(hyprland, 'workspaces').as((w) => {
        const monitorWorkspaces = w.filter((w) => w.monitor.id === monitor && w.id > 0);
        return monitorWorkspaces.sort((a, b) => a.id - b.id).map(WorkspaceButton);
      })}
    </box>
  );
}
