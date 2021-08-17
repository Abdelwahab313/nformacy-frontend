import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  postProjectButton: {
    marginLeft: theme.spacing(2),
  },
  addNewConsultantBtn: {
    float: 'right',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  beneficiariesSection: {
    marginTop: theme.spacing(3),
  },
  addConsultantsTable: { marginBottom: 30 },
}));
