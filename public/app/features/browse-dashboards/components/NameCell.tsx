import { css } from '@emotion/css';
import React from 'react';
import { CellProps } from 'react-table';

import { GrafanaTheme2 } from '@grafana/data';
import { Icon, IconButton, Link, useStyles2 } from '@grafana/ui';
import { getSvgSize } from '@grafana/ui/src/components/Icon/utils';

import { DashboardsTreeItem, SelectionState } from '../types';

import { Indent } from './Indent';

type NameCellProps = CellProps<DashboardsTreeItem, unknown> & {
  onFolderClick: (uid: string, newOpenState: boolean) => void;
};

export function NameCell({ row: { original: data }, onFolderClick, isSelected }: NameCellProps) {
  const styles = useStyles2(getStyles);
  const { item, level, isOpen } = data;

  if (item.kind === 'ui-empty-folder') {
    return (
      <>
        <Indent level={level} />
        <span className={styles.folderButtonSpacer} />
        <em>Empty folder</em>
      </>
    );
  }

  const chevronIcon = isOpen ? 'angle-down' : 'angle-right';

  return (
    <div className={styles.container}>
      <Indent level={level} />

      {item.kind === 'folder' ? (
        <IconButton
          size="md"
          onClick={() => onFolderClick(item.uid, !isOpen)}
          name={chevronIcon}
          ariaLabel={isOpen ? 'Collapse folder' : 'Expand folder'}
        />
      ) : (
        <span className={styles.folderButtonSpacer} />
      )}

      {item.url ? (
        <Link href={item.url} className={styles.link}>
          {item.title}
        </Link>
      ) : (
        item.title
      )}
      {!isOpen && isSelected(item) === SelectionState.Mixed && (
        <Icon
          name="exclamation-triangle"
          className={styles.warningIcon}
          title="Children of this folder are selected!"
        />
      )}
    </div>
  );
}

const getStyles = (theme: GrafanaTheme2) => {
  return {
    // Should be the same size as the <IconButton /> so Dashboard name is aligned to Folder name siblings
    container: css({
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      gap: theme.spacing(0.5),
    }),
    folderButtonSpacer: css({
      paddingLeft: `calc(${getSvgSize('md')}px + ${theme.spacing(0.5)})`,
    }),
    link: css({
      '&:hover': {
        textDecoration: 'underline',
      },
    }),
    warningIcon: css({
      color: theme.colors.warning.main,
    }),
  };
};
