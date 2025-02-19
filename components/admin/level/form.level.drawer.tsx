import Drawer, { DrawerProps } from '@/components/_core/drawer/drawer';

type LevelFormDrawerProps = {
  levelId: undefined | Level['id'];
} & DrawerProps;
export default function LevelFormDrawer({
  levelId,
  ...props
}: LevelFormDrawerProps) {
  return (
    <Drawer size="3xl" {...props}>
      LevelFormDrawer {levelId ?? 'new'}
    </Drawer>
  );
}
