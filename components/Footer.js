'use client'

import styles from '@/styles/Footer.module.css';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <p className={styles.cc}>
        <a
          href='https://creativecommons.org/licenses/by-nc-sa/4.0/'
          rel='noreferrer'
          target='_blank'
        >
          CC BY-NC-SA 4.0
        </a>{' '}
        © dsapr
      </p>
      <a href='https://beian.miit.gov.cn/' rel='noreferrer' target='_blank'>
        陕ICP备2022011030号
      </a>
    </div>
  )
}