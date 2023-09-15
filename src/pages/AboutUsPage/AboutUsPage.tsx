import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import photoBazhenov from 'assets/img/Iurii_Bazhenov.jpg';
import photoFatkullin from 'assets/img/Vitaly_Fatkullin.jpg';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Diversity3, QuestionAnswer, Sms, Star, Task } from '@mui/icons-material';
import styles from './AboutUsPage.module.scss';

// eslint-disable-next-line max-lines-per-function
function AboutUsPage() {
  return (
    <Box className={styles.about}>
      <Typography component="h2" variant="h2" mb={2}>
        About Us
      </Typography>
      <Typography className={styles.title} component="h3" variant="h3" textAlign="center" mb={3}>
        Team Members
      </Typography>
      <Stack className={styles.members} direction="row" spacing={3} maxWidth="1084px" ml="auto" mr="auto" mb={6}>
        <Card className={styles.card}>
          <CardMedia className={styles['card-image']} component="img" image={photoBazhenov} alt="Iurii Bazhenov" />
          <CardHeader title="Iurii Bazhenov" titleTypographyProps={{ fontWeight: '700' }} />
          <CardContent>
            <Typography component="h6" variant="h6">
              Role:
            </Typography>
            <Typography>Team lead</Typography>
          </CardContent>
          <CardContent>
            <Typography component="h6" variant="h6">
              Education:
            </Typography>
            <Typography>Ryazan State Radio Engineering University</Typography>
          </CardContent>
          <CardContent>
            <Typography component="h6" variant="h6">
              Location:
            </Typography>
            <Typography>Berlin, Germany</Typography>
          </CardContent>
          <CardContent>
            <Typography component="h6" variant="h6">
              Bio:
            </Typography>
            <Typography>
              I am a programmer with 10 years of experience. I worked in the development of large ERP solutions on the
              platform 1С:Enterprise (low-coding, full-featured platform like SAP). I went from being an ordinary
              developer to the head of the development team. During this time I have gained experience not only in
              programming, but also in database design, business analysis, automated testing, building workflows,
              developing standards and best practices, and of course managing a team of developers. Although I had great
              success in 1C, I wanted more: to go beyond the limits of a narrowly focused programming language, to study
              the global development practices. And here in my life came RSSchool :)
            </Typography>
          </CardContent>
          <CardContent>
            <Typography component="h6" variant="h6">
              Contribution:
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Participated in analyzing and selecting technical solutions, tools and libraries used in the project" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Conducted prioritization and distribution of tasks" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Ensured communication and collaboration within the team" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Implemented a number of key mechanisms such as a personal user account, shopping cart and many others" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Performed testing of new functionality, user interface and overall performance of the application" />
              </ListItem>
            </List>
          </CardContent>
          <CardActions sx={{ marginTop: 'auto' }}>
            <Link href="https://github.com/BazhenovYN" target="_blank">
              <GitHubIcon className={styles['card-github']} fontSize="large" />
            </Link>
          </CardActions>
        </Card>
        <Card className={styles.card}>
          <CardMedia className={styles['card-image']} component="img" image={photoFatkullin} alt="Vitaly Fatkullin" />
          <CardHeader title="Vitaly Fatkullin" titleTypographyProps={{ fontWeight: '700' }} />
          <CardContent>
            <Typography component="h6" variant="h6">
              Role:
            </Typography>
            <Typography>Developer</Typography>
          </CardContent>
          <CardContent>
            <Typography component="h6" variant="h6">
              Education:
            </Typography>
            <Typography>Secondary</Typography>
          </CardContent>
          <CardContent>
            <Typography component="h6" variant="h6">
              Location:
            </Typography>
            <Typography>Yekaterinburg, Russia</Typography>
          </CardContent>
          <CardContent>
            <Typography component="h6" variant="h6">
              Bio:
            </Typography>
            <Typography>
              At the moment I am working as an html coder, thanks to my work I have learned html and css, and I am
              interested in learning JavaScript. I started to study programming at school, after that I went to
              university to specialize in &ldquo;Computer Security&rdquo;, but unfortunately I dropped it out after
              first course, there I got acquainted with such programming languages as C# and Python. Now I want to learn
              programming again, more precisely I became interested in Frontend development, and I came across the
              RSSchool course.
            </Typography>
          </CardContent>
          <CardContent>
            <Typography component="h6" variant="h6">
              Contribution:
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Actively participated in the discussion of requirements for the application functionality" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Implemented a number of key mechanisms such as API integration, authentication, product catalog and many others" />
              </ListItem>
              <ListItem>
                <ListItemText primary="During code-reviews offered recommendations to improve the quality and efficiency of the code base" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Performed testing of new functionality, user interface and overall performance of the application" />
              </ListItem>
            </List>
          </CardContent>
          <CardActions sx={{ marginTop: 'auto' }}>
            <Link href="https://github.com/ImmuneQQ" target="_blank">
              <GitHubIcon className={styles['card-github']} fontSize="large" />
            </Link>
          </CardActions>
        </Card>
      </Stack>
      <Stack maxWidth="1084px" mr="auto" ml="auto" mb={3}>
        <Typography component="h3" variant="h3" textAlign="center" mb={3} className={styles.title}>
          Collaboration
        </Typography>
        <Typography component="h5" variant="h5" textAlign="center" mb={2} className={styles.title}>
          To achieve a successful outcome, we adhered to the following principles:
        </Typography>
        <List className={styles.list}>
          <ListItem className={styles['list-item']}>
            <ListItemIcon>
              <Sms color="primary" />
            </ListItemIcon>
            <ListItemText primary="Clear and regular communication" />
          </ListItem>
          <ListItem className={styles['list-item']}>
            <ListItemIcon>
              <Task color="primary" />
            </ListItemIcon>
            <ListItemText primary="Effective division of tasks and responsibilities" />
          </ListItem>
          <ListItem className={styles['list-item']}>
            <ListItemIcon>
              <QuestionAnswer color="primary" />
            </ListItemIcon>
            <ListItemText primary="Constructive feedback and error correction" />
          </ListItem>
          <ListItem className={styles['list-item']}>
            <ListItemIcon>
              <Diversity3 color="primary" />
            </ListItemIcon>
            <ListItemText primary="Mutual assistance, support and cooperation" />
          </ListItem>
          <ListItem className={styles['list-item']}>
            <ListItemIcon>
              <Star color="primary" />
            </ListItemIcon>
            <ListItemText primary="Striving of each team member to create the best possible product" />
          </ListItem>
        </List>
      </Stack>
    </Box>
  );
}

export default AboutUsPage;
