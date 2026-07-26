import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Github } from "lucide-react";
import ProgressiveImage from "../components/ProgressiveImage";
import projects from "../data/projects";

function ProjectDetail() {
    const { projectSlug } = useParams();
    const project = projects.find(({ slug }) => slug === projectSlug);

    useEffect(() => {
        if (!project) return;

        const previousTitle = document.title;
        document.title = `${project.title} | Ashan Akalanka`;

        return () => {
            document.title = previousTitle;
        };
    }, [project]);

    if (!project) {
        return (
            <section className="theme-section flex min-h-[75vh] items-center bg-white px-6 pb-16 pt-32 text-center transition-colors duration-300">
                <div className="mx-auto max-w-xl">
                    <p className="section-kicker text-[#2563EB] dark:text-[#38BDF8]">404 / Project</p>
                    <h1 className="mt-4 text-4xl font-extrabold text-gray-950 dark:text-white md:text-6xl">
                        Project not found
                    </h1>
                    <p className="mt-5 text-sm leading-7 text-gray-600 dark:text-gray-300 md:text-base">
                        This project page may have moved. You can return to the portfolio and explore the available work.
                    </p>
                    <Link
                        to="/#projects"
                        className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-gray-950 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#2563EB] dark:bg-[#38BDF8] dark:text-[#081a2f]"
                    >
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        Back to projects
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <article className="theme-section bg-white text-gray-950 transition-colors duration-300 dark:text-white">
            <header className="px-4 pb-12 pt-28 sm:px-6 md:pb-16 md:pt-36 lg:px-12">
                <div className="mx-auto max-w-[1320px]">
                    <Link
                        to="/#projects"
                        className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-gray-500 transition-colors hover:text-[#2563EB] dark:text-[#a8b3d1] dark:hover:text-[#38BDF8]"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                        Back to projects
                    </Link>

                    <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.52fr)] lg:items-end">
                        <div>
                            <p className="section-kicker text-[#2563EB] dark:text-[#38BDF8]">
                                {project.category}
                            </p>
                            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.025em] text-gray-950 dark:text-white sm:text-5xl md:text-7xl">
                                {project.title}
                            </h1>
                        </div>

                        <div>
                            <p className="text-sm leading-7 text-gray-600 dark:text-gray-300 md:text-base">
                                {project.description}
                            </p>
                            <a
                                href={project.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-6 inline-flex min-h-12 items-center gap-3 rounded-full bg-gray-950 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-white transition-all hover:-translate-y-0.5 hover:bg-[#2563EB] hover:shadow-lg dark:bg-[#38BDF8] dark:text-[#081a2f] dark:hover:bg-[#0EA5E9]"
                            >
                                <Github className="h-4 w-4" aria-hidden="true" />
                                View source
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            <section className="px-4 sm:px-6 lg:px-12" aria-label={`${project.title} main preview`}>
                <div className="mx-auto max-w-[1320px] overflow-hidden rounded-[1.5rem] bg-[#e8edf3] shadow-[0_24px_80px_rgba(15,23,42,0.14)] dark:bg-white/5 md:rounded-[2rem]">
                    <ProgressiveImage
                        src={project.image}
                        alt={`${project.title} website interface`}
                        loading="eager"
                        wrapperClassName="aspect-[16/10] w-full md:aspect-[16/9]"
                        className="h-full w-full object-cover object-top"
                    />
                </div>
            </section>

            <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-12">
                <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-20">
                    <div>
                        <p className="section-kicker text-[#2563EB] dark:text-[#38BDF8]">Project overview</p>
                        <h2 className="mt-4 text-3xl font-extrabold text-gray-950 dark:text-white md:text-5xl">
                            Built with purpose.
                        </h2>
                        <p className="body-copy mt-6 text-gray-600 dark:text-gray-300">
                            {project.longDescription}
                        </p>
                    </div>

                    <aside className="h-fit border-t border-gray-200 pt-6 dark:border-white/10 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                        <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-gray-950 dark:text-white">
                            Tech stack
                        </h2>
                        <div className="mt-5 flex flex-wrap gap-2.5">
                            {project.tech.map((technology) => (
                                <span
                                    key={technology}
                                    className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-[#d7def7]"
                                >
                                    {technology}
                                </span>
                            ))}
                        </div>
                    </aside>
                </div>
            </section>

            <section className="bg-[#f4f4f4] px-4 py-16 dark:bg-[#111827] sm:px-6 md:py-24 lg:px-12">
                <div className="mx-auto max-w-[1320px]">
                    <div className="mb-9 md:mb-12">
                        <p className="section-kicker text-[#2563EB] dark:text-[#38BDF8]">Website images</p>
                        <h2 className="mt-3 text-3xl font-extrabold text-gray-950 dark:text-white md:text-5xl">
                            Interface details
                        </h2>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2 md:gap-7">
                        <figure className="overflow-hidden rounded-[1.25rem] bg-white shadow-sm dark:bg-white/5 md:col-span-2 md:rounded-[1.75rem]">
                            <ProgressiveImage
                                src={project.image}
                                alt={`Full ${project.title} interface overview`}
                                wrapperClassName="aspect-[16/9] w-full"
                                className="h-full w-full object-cover object-top"
                            />
                            <figcaption className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-gray-500 dark:text-[#a8b3d1] md:px-7">
                                Full interface
                            </figcaption>
                        </figure>

                        <figure className="overflow-hidden rounded-[1.25rem] bg-white shadow-sm dark:bg-white/5 md:rounded-[1.75rem]">
                            <ProgressiveImage
                                src={project.image}
                                alt={`${project.title} top interface detail`}
                                wrapperClassName="aspect-[4/3] w-full"
                                className="h-full w-full scale-[1.18] object-cover object-top"
                            />
                            <figcaption className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-gray-500 dark:text-[#a8b3d1] md:px-7">
                                Navigation &amp; content
                            </figcaption>
                        </figure>

                        <figure className="overflow-hidden rounded-[1.25rem] bg-white shadow-sm dark:bg-white/5 md:rounded-[1.75rem]">
                            <ProgressiveImage
                                src={project.image}
                                alt={`${project.title} central interface detail`}
                                wrapperClassName="aspect-[4/3] w-full"
                                className="h-full w-full scale-[1.22] object-cover object-center"
                            />
                            <figcaption className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-gray-500 dark:text-[#a8b3d1] md:px-7">
                                Visual system
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </section>

            <section className="px-4 py-16 text-center sm:px-6 md:py-24">
                <p className="section-kicker text-[#2563EB] dark:text-[#38BDF8]">Explore more work</p>
                <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold text-gray-950 dark:text-white md:text-5xl">
                    See the rest of my projects.
                </h2>
                <Link
                    to="/#projects"
                    className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full border border-gray-300 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-gray-900 transition-all hover:border-[#2563EB] hover:bg-[#2563EB] hover:text-white dark:border-white/15 dark:text-white dark:hover:border-[#38BDF8] dark:hover:bg-[#38BDF8] dark:hover:text-[#081a2f]"
                >
                    All projects
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
            </section>
        </article>
    );
}

export default ProjectDetail;
