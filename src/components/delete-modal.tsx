import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

const TITLE = 'Are you completely certain??'
const DESCRIPTION = `This action is irreversible. It will delete your transaction permanently.`

export const DeleteModal = ({
  children,
  onDelete,
}: React.PropsWithChildren<{ onDelete: VoidFunction }>) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent className="flex flex-col gap-5 overflow-hidden">
        <AlertDialogHeader className="text-left">
          <AlertDialogTitle>{TITLE}</AlertDialogTitle>
          <AlertDialogDescription>{DESCRIPTION}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="hover:bg-destructive"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
