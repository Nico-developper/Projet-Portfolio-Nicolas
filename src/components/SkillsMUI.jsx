import * as React from "react";
import {
    Box,
    Paper,
    Typography,
    Rating,
    LinearProgress,
    Grid,
} from "@mui/material";

export default function SkillsMUI({
    competences = [],
    languages = [],
    titleCompetences = "Compétences clés",
    titleLanguages = "Langages & technologies",
}) {
    return (
        <Box component='section' sx={{ my: 6 }}>
            <Typography variant='h4' gutterBottom>
                {titleCompetences}
            </Typography>
            <Grid container spacing={2}>
                {competences.map((c, i) => (
                    <Grid item xs={12} sm={6} md={4} key={i}>
                        <Paper elevation={2} sx={{ p: 2 }}>
                            <Typography variant='subtitle1'>
                                {c.name}
                            </Typography>
                            <Rating name={c.name} value={c.level} readOnly />
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Typography variant='h4' sx={{ mt: 6 }} gutterBottom>
                {titleLanguages}
            </Typography>
            <Grid container spacing={2}>
                {languages.map((l, i) => (
                    <Grid item xs={12} sm={6} md={4} key={i}>
                        <Paper elevation={2} sx={{ p: 2 }}>
                            <Typography variant='subtitle1' gutterBottom>
                                {l.name}
                            </Typography>
                            <LinearProgress
                                variant='determinate'
                                value={l.value}
                                sx={{ height: 10, borderRadius: 2 }}
                            />
                            <Typography variant='caption'>
                                {l.value}%
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
