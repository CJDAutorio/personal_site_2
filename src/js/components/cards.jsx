import { useEffect } from 'react';

function ProjectCard(props) {
    const projectCardId = props.projectId + '-project-card'

    useEffect(() => {
        document.getElementById(projectCardId).addEventListener('click', () => {
            window.open(props.projectLink, '_blank')
        })
    });

    return (
        <div className='project-card' id={projectCardId}>
            <div className='project-card-image-container'>
                <img src={props.projectImage} />
            </div>
            <div className='project-card-overlay' />
            <div className='project-card-text'>
                <h3 className='flex-content-row'>{props.projectName}</h3>
                <div className='project-card-desc'>{ props.projectDesc }</div>
            </div>
            {/* <div className='flex-content-col'>
                <p>GitHub Link: <a href={ props.projectLink }>{ props.projectLink }</a></p>
                <p>{ props.projectDesc }</p>
            </div> */}
        </div>
    )
}

export default ProjectCard;
