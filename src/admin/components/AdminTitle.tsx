import React, { type FC } from 'react'

interface AdminTitleProps {
    title: string
    subtitle: string
}

const AdminTitle: FC<AdminTitleProps> = ({
    title,
    subtitle,
}: AdminTitleProps) => (
    <>
        <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {title}
                {/* Welcome back, John! 👋 */}
            </h1>
            <p className="text-gray-600">
                {subtitle}
                {/* Here's what's happening with your business today. */}
            </p>
        </div>
    </>
)

export default AdminTitle
