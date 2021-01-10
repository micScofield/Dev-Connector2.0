import { Fragment, useEffect, useCallback, useMemo } from 'react'
import { connect } from 'react-redux'

import { getGithubRepos } from '../../../store/actions'

const ProfileRepos = ({ username, repos, getGithubRepos, loading }) => {

    useEffect(() => {
        getGithubRepos(username)
    }, [])

    return <Fragment>
        <h1 className='primary-color my-bottom-1'>GitHub Repositories</h1>

        {!loading && repos.length === 0 ? <h3>No Github Repos to show</h3> : <Fragment>
            {!loading && repos.length !== 0 ? repos.map(repo => {
                return <div key={repo.id} className='repo'>
                    <div>
                        <a href={repo.html_url} target='_blank' style={{color: 'black'}}>
                            <h3 className='my-bottom'>{repo.name}</h3>
                        </a>
                        <p>{repo.description}</p>
                    </div>

                    <div className='my-bottom-1'>
                        <ul>
                            <li className="badge badge-primary">
                                Stars: {repo.stargazers_count}
                            </li>
                            <li className="badge badge-dark">
                                Watchers: {repo.watchers_count}
                            </li>
                            <li className="badge badge-white">
                                Forks: {repo.forks_count}
                            </li>
                        </ul>
                    </div>
                </div>
            }) : null}
        </Fragment>}

    </Fragment>
}

const mapStateToProps = state => {
    return {
        loading: state.profile.loading,
        repos: state.profile.repos
    }
}

export default connect(mapStateToProps, { getGithubRepos })(ProfileRepos)
