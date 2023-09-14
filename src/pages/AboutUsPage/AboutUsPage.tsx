import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, Link, Stack, Typography } from '@mui/material';
import photoBazhenov from 'assets/img/Iurii_Bazhenov - Copy.jpg';
import photoFatkullin from 'assets/img/Vitaly_Fatkullin - Copy.jpg';
import styles from 'pages/AboutUsPage/AboutUsPage.module.scss';
import GitHubIcon from '@mui/icons-material/GitHub';

function AboutUsPage() {
  return (
    <Box>
      <Typography component="h2" variant="h2" mb={2}>
        About Us
      </Typography>
      <Typography component="h3" variant="h3" textAlign="center" mb={3}>
        Team Members
      </Typography>
      <Stack direction="row" spacing={3} maxWidth="1084px" ml="auto" mr="auto" mb={6}>
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
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus a turpis vitae scelerisque. Interdum
              et malesuada fames ac ante ipsum primis in faucibus. Nulla facilisi. Cras varius justo eget semper
              lacinia. Aenean lobortis, tellus sit amet rutrum rutrum, elit lorem pharetra ex, sed vestibulum velit
              dolor a ante. Cras tempus metus eget mollis convallis.
            </Typography>
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
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus a turpis vitae scelerisque. Interdum
              et malesuada fames ac ante ipsum primis in faucibus. Nulla facilisi. Cras varius justo eget semper
              lacinia. Aenean lobortis, tellus sit amet rutrum rutrum, elit lorem pharetra ex, sed vestibulum velit
              dolor a ante. Cras tempus metus eget mollis convallis.
            </Typography>
          </CardContent>
          <CardActions sx={{ marginTop: 'auto' }}>
            <Link href="https://github.com/ImmuneQQ" target="_blank">
              <GitHubIcon className={styles['card-github']} fontSize="large" />
            </Link>
          </CardActions>
        </Card>
      </Stack>
      <Typography component="h3" variant="h3" textAlign="center" mb={3}>
        Collaboration
      </Typography>
      <Typography textAlign="center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus a turpis vitae scelerisque. Interdum et
        malesuada fames ac ante ipsum primis in faucibus. Nulla facilisi. Cras varius justo eget semper lacinia. Aenean
        lobortis, tellus sit amet rutrum rutrum, elit lorem pharetra ex, sed vestibulum velit dolor a ante. Cras tempus
        metus eget mollis convallis. Nunc ut lorem aliquam, consequat nunc vel, ullamcorper arcu. Proin scelerisque
        sapien iaculis consectetur lacinia. Phasellus arcu lectus, aliquet quis luctus vel, consequat consequat augue.
        Curabitur porttitor felis diam, ut mollis ligula lacinia lacinia. Quisque laoreet et enim quis pellentesque.
      </Typography>
    </Box>
  );
}

export default AboutUsPage;
